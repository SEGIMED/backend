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
    } = body;

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

    const newPrescriptionModificationsHistory =
      await models.PrescriptionModificationsHistory.create({
        medicationPrescriptionId,
        physicianId: contextService.get("request:user").userId,
        modificationTimestamp: moment().tz(TZ).toISOString(),
        medicalEventId,
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
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error al modificar la prescripción: " + error,
      500
    );
  }
};

export default updateDrugPrescriptionHandler;
