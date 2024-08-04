import { DrugPrescription } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import createDrugPrescriptionHandler from "./createDrugPrescriptionHandler.js"; // Importa la función de creación
import deleteDrugPrescriptionsHandler from "./deleteDrugPrescriptionsHandler.js";

const updateDrugPrescriptionHandler = async (body) => {
  const {
    //id,
    patientId,
    drugId,
    drugName,
    // prescribedDose,
    quantity,
    medicalEventId,
  } = body;
  // deleteDrugPrescriptionsHandler(medicalEventId);
};

export default updateDrugPrescriptionHandler;
