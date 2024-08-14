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
  } = body;

  try {
    //Con la medicacion creada se hace una nueva instancia de presciption
    const newPrescription = await models.MedicationPrescription.create(
      {
        startTimestamp: moment().tz(TZ).format(),
        medicalEventId,
        patientId,
        physicianId: contextService.get("request:user").userId,
      },
      {
        transaction,
      }
    );
    //Con la nueva instancia se hace la primera entrada para la historia clinica del medicamento
    const prescriptionModificationHistory =
      await models.PrescriptionMofidicationsHistory.create(
        {
          medicationPrescriptionId: newPrescription.id,
          physicianId: contextService.get("request:user").userId,
          modificationTimestamp: moment().tz(TZ).toISOString(),
          medicalEventId,
          observations,
          indications,
          doseMeasure,
          timeMeasure,
          timeMeasureType,
          drugDetailPresentationId,
        },
        { transaction }
      );
    return { newPrescription, prescriptionModificationHistory };
  } catch (error) {
    throw new SegimedAPIError("Hubo un error durante en la prescripción.", 500);
  }
};

export default createDrugPrescriptionHandler;
