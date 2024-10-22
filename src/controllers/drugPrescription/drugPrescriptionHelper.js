import models from "../../databaseConfig.js";
import createDrugPrescriptionHandler from "../../handlers/drugPrescription/createDrugPrescriptionHandler.js";
import drugCreationHandler from "../../handlers/drugPrescription/drugCreationHandler.js";
import updateDrugPrescriptionHandler from "../../handlers/drugPrescription/updateDrugPrescriptionHandler.js";
import validateDrugCreationData from "../../validations/validateDrugCreation.js";
import { validateDrugPrescriptionInput } from "../../validations/validateDrugPrescriptionInput.js";

export const createDrugPrescriptions = async (prescriptions, transaction) => {
  try {
    if (!Array.isArray(prescriptions)) {
      throw new Error(
        "El cuerpo de la solicitud debe contener un array de medicamentos."
      );
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
      const { patientId } = prescription.prescriptionCreation;
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

      //Verificación pa ver si ya existe una prescripción para el paciente

      const existingPrescription = await models.MedicationPrescription.findOne({
        where: {
          patientId,
        },
        include: {
          model: models.PrescriptionModificationsHistory,
          as: "medicationPrescription",
          where: {
            drugDetailPresentationId: drugDetailId,
          },
        },
      });
      if (existingPrescription && existingPrescription.active && !existingPrescription.deleted) {
        await updateDrugPrescriptionHandler(
          {
            medicationPrescriptionId: existingPrescription.id,
            ...prescriptionCreation,
          },
          transaction
        );
      } else {
        await createDrugPrescriptionHandler(
          {
            ...prescriptionCreation,
            drugDetailPresentationId: drugDetailId,
            commercialNameDrugId: commercialNameId,
          },
          transaction
        );
      }
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
};
