import models from "../../databaseConfig.js";
import moment from "moment-timezone";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import contextService from "request-context";
const TZ = process.env.TZ;

const updateDrugPrescriptionHandler = async (body) => {
  try {
    const {
      medicationPrescriptionId,
      medicalEventId,
      observations,
      indications,
      doseMeasure,
      timeMeasure,
      timeMeasureType,
      medicalOrderId,
    } = body;

    if (!medicalOrderId && !medicalEventId) {
      throw new SegimedAPIError(
        "Se necesita el ID de una orden médica o una consulta",
        400
      );
    }

    const drugDetailPresentation =
      await models.PrescriptionModificationsHistory.findOne({
        where: { medicationPrescriptionId },
      });

    const medicationPresciptionCheck =
      await models.MedicationPrescription.findOne({
        where: { id: medicationPrescriptionId },
      });

    if (
      !medicationPresciptionCheck?.active ||
      medicationPresciptionCheck?.deleted
    ) {
      throw new SegimedAPIError(
        "No es posible modificar una prescripción desactivada o eliminada",
        500
      );
    }


    const existingHistoryEntry =
      await models.PrescriptionModificationsHistory.findOne({
        where: {
          medicationPrescriptionId,
          physicianId: contextService.get("request:user").userId,
          medicalEventId: medicalEventId ?? null,
          medicalOrderId: medicalOrderId ?? null,
        },
      });

    if (existingHistoryEntry) {
      await existingHistoryEntry.update({
        modificationTimestamp: moment().tz(TZ).toISOString(),
        observations,
        indications,
        doseMeasure,
        timeMeasure,
        timeMeasureType,
        drugDetailPresentationId:
          drugDetailPresentation.drugDetailPresentationId,
        commercialNameDrugId: drugDetailPresentation.commercialNameDrugId,
      });
      return existingHistoryEntry;
    } else {
      const newPrescriptionModificationsHistory =
        await models.PrescriptionModificationsHistory.create({
          medicationPrescriptionId,
          physicianId: contextService.get("request:user").userId,
          modificationTimestamp: moment().tz(TZ).toISOString(),
          medicalEventId: medicalEventId ?? null,
          medicalOrderId: medicalOrderId ?? null,
          observations,
          indications,
          doseMeasure,
          timeMeasure,
          timeMeasureType,
          drugDetailPresentationId:
            drugDetailPresentation.drugDetailPresentationId,
          commercialNameDrugId: drugDetailPresentation.commercialNameDrugId,
        });
      return newPrescriptionModificationsHistory;
    }
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error al modificar la prescripción: " + error.message,
      500
    );
  }
};

export default updateDrugPrescriptionHandler;
