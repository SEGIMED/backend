import models from "../../databaseConfig.js";
import moment from "moment-timezone";
import contextService from "request-context";
import SegimedAPIError from "../../error/SegimedAPIError.js";
const TZ = process.env.TZ;

const createDrugPrescriptionHandler = async (body, transaction) => {
  const {
    medicalEventId,
    patientId,
    observations,
    indications,
    doseMeasure,
    timeMeasure,
    timeMeasureType,
    drugDetailPresentationId,
    commercialNameDrugId,
    medicalOrderId,
  } = body;

  try {
    if (!medicalOrderId && !medicalEventId) {
      throw new SegimedAPIError(
        "Se necesita el ID de una orden médica o de un evento médico.",
        400
      );
    }

    const physicianId = contextService.get("request:user").userId;

    const newPrescription = await models.MedicationPrescription.create(
      {
        startTimestamp: moment().tz(TZ).format(),
        medicalEventId: medicalEventId ?? null,
        medicalOrderId: medicalOrderId ?? null,
        patientId,
        physicianId,
      },
      { transaction }
    );
    const existingHistoryEntry =
      await models.PrescriptionModificationsHistory.findOne({
        where: {
          medicalEventId: medicalEventId ?? null,
          medicalOrderId: medicalOrderId ?? null,
          commercialNameDrugId,
          physicianId,
        },
        transaction,
      });
    console.log(existingHistoryEntry);

    if (existingHistoryEntry) {
      await existingHistoryEntry.update(
        {
          modificationTimestamp: moment().tz(TZ).toISOString(),
          observations,
          indications,
          doseMeasure,
          timeMeasure,
          timeMeasureType,
          drugDetailPresentationId,
        },
        { transaction }
      );
      return {
        newPrescription,
        prescriptionModificationHistory: existingHistoryEntry,
      };
    } else {
      const prescriptionModificationHistory =
        await models.PrescriptionModificationsHistory.create(
          {
            medicationPrescriptionId: newPrescription.id,
            physicianId,
            modificationTimestamp: moment().tz(TZ).toISOString(),
            medicalEventId: medicalEventId ?? null,
            medicalOrderId: medicalOrderId ?? null,
            observations,
            indications,
            doseMeasure,
            timeMeasure,
            timeMeasureType,
            drugDetailPresentationId,
            commercialNameDrugId,
          },
          { transaction }
        );

      return { newPrescription, prescriptionModificationHistory };
    }
  } catch (error) {
    console.log(error);
    throw new SegimedAPIError(
      "Hubo un error durante en la prescripción: " + error.message,
      500
    );
  }
};

export default createDrugPrescriptionHandler;
