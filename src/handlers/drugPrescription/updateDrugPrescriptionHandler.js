import models from "../../databaseConfig";
import SegimedAPIError from "../../error/SegimedAPIError";

const updateDrugPrescriptionHandler = async (body) => {
  try {
    const {
      medicationPrescriptionId,
      medicalEventId,
      observations,
      indications,
      doseMeasure,
      timeMeasure,
      timeMeasureType
    } = body

    const newPrescriptionModificationsHistory = await models.PrescriptionMofidicationsHistory.create({
      medicationPrescriptionId,
      physicianId: contextService.get("request:user").userId,
      modificationTimestamp: moment().tz(TZ).format(),
      medicalEventId,
      observations,
      indications,
      doseMeasure,
      timeMeasure,
      timeMeasureType,
    })
    return newPrescriptionModificationsHistory
  } catch (error) {
    throw new SegimedAPIError("Hubo un error al modificar la prescripción",500)
  }
};

export default updateDrugPrescriptionHandler;
