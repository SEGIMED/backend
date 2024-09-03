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
      throw new Error("Se necesita el ID de una orden medical o una consulta");
    }
    //Con la medicacion creada se hace una nueva instancia de presciption
    const newPrescription = await models.MedicationPrescription.create(
      {
        startTimestamp: moment().tz(TZ).format(),
        medicalEventId: medicalEventId ?? null,
        medicalOrderId: medicalOrderId ?? null,
        patientId,
        physicianId: contextService.get("request:user").userId,
      },
      {
        transaction,
      }
    );
    //Con la nueva instancia se hace la primera entrada para la historia clinica del medicamento
    const prescriptionModificationHistory =
      await models.PrescriptionModificationsHistory.create(
        {
          medicationPrescriptionId: newPrescription.id,
          physicianId: contextService.get("request:user").userId,
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
  } catch (error) {
    console.log(error);
    throw new SegimedAPIError(
      "Hubo un error durante en la prescripción: " + error.message,
      500
    );
  }
};

export default createDrugPrescriptionHandler;
