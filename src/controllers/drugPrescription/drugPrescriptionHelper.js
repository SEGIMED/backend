import createDrugPrescriptionHandler from "../../handlers/drugPrescription/createDrugPrescriptionHandler.js";
import drugCreationHandler from "../../handlers/drugPrescription/drugCreationHandler.js";
import validateDrugCreationData from "../../validations/validateDrugCreation.js";
import { validateDrugPrescriptionInput } from "../../validations/validateDrugPrescriptionInput.js";

export const createDrugPrescriptions = async (prescriptions, transaction) => {
    try {
        if (!Array.isArray(prescriptions)) {
            throw new Error("El cuerpo de la solicitud debe contener un array de medicamentos.");
          }
        
          for (const prescription of prescriptions) {
            validateDrugPrescriptionInput(prescription);
            validateDrugCreationData(prescription.drugCreation);
        
            const {
              drugDetailPresentationId,
              commercialNameDrugId,
              drugCreation,
              prescriptionCreation,
            } = prescription;
        
            let drugDetailId = drugDetailPresentationId;
            let commercialNameId = commercialNameDrugId;
        
            if (!drugDetailId) {
              const createdDrugDetail = await drugCreationHandler(
                drugCreation,
                transaction
              );
        
              drugDetailId = createdDrugDetail.id;
              commercialNameId = createdDrugDetail.commercialNameDrugId;
            }
        
            await createDrugPrescriptionHandler(
              {
                ...prescriptionCreation,
                drugDetailPresentationId: drugDetailId,
                commercialNameDrugId: commercialNameId,
              },
              transaction
            );
          }
          return "Medicamentos creados con éxito"
    } catch (error) {
        throw new Error(error);
        
    }
  };