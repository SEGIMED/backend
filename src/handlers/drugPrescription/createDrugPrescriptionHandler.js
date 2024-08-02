import { DrugPrescription } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";

const createDrugPrescriptionHandler = async (body) => {
  const { drugId, drugName, prescribedDose, quantity, medicalEventId } = body;

  try {
    const newPrescription = await DrugPrescription.create({
      prescriptionTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
      drugName,
      prescribedDose,
      quantity,
      medicalEvent: medicalEventId,
    });
    return newPrescription;
  } catch (error) {
    throw new SegimedAPIError("Hubo un error durante en la prescripción.", 500);
  }
};

export default createDrugPrescriptionHandler;
