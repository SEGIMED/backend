import { DrugPrescription } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import contextService from "request-context";
import moment from "moment-timezone";

const createDrugPrescriptionHandler = async (body) => {
  const {
    patientId,
    drugId,
    drugName,
    prescribedDose,
    quantity,
    medicalEventId,
  } = body;

  try {
    const newPrescription = await DrugPrescription.create({
      patient: patientId,
      prescribedPhysician: contextService.get("request:user").userId,
      prescriptionTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
      drug: 1,
      drugName,
      prescribedDose,
      quantity,
      medicalEvent: medicalEventId,
    });
    return newPrescription;
  } catch (error) {
    console.error(error.message);
    throw new SegimedAPIError("Hubo un error durante en la prescripción.", 500);
  }
};

export default createDrugPrescriptionHandler;
