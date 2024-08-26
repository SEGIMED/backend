import validateDrugCreationData from "../../../validations/validateDrugCreation.js";
import { validateDrugPrescriptionInput } from "../../../validations/validateDrugPrescriptionInput.js";
import drugCreationHandler from "../../../handlers/drugPrescription/drugCreationHandler.js";
import createDrugPrescriptionHandler from "../../../handlers/drugPrescription/createDrugPrescriptionHandler.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const createMedicamentInOrderCtrl = async (body, newOrderId, transaccion) => {
  try {
    validateDrugPrescriptionInput(body[0]);
    validateDrugCreationData(body[0].drugCreation);
    const response = await Promise.all(
      body.map(
        async ({
          drugDetailPresentationId,
          drugCreation,
          prescriptionCreation,
        }) => {
          prescriptionCreation.medicalOrderId = newOrderId;
          let drugDetailId = drugDetailPresentationId;
          let commercialNameId = drugCreation.commercialDrugName;

          if (!drugDetailId) {
            const createdDrugDetail = await drugCreationHandler(
              drugCreation,
              transaccion
            );
            drugDetailId = createdDrugDetail.id;
            commercialNameId = createdDrugDetail.commercialNameDrugId;
          }

          const newPrescription = await createDrugPrescriptionHandler(
            {
              ...prescriptionCreation,
              drugDetailPresentationId: drugDetailId,
              commercialNameDrugId: commercialNameId,
            },
            transaccion
          );

          return newPrescription;
        }
      )
    );

    return response;
  } catch (error) {
    console.error(error);
    throw new SegimedAPIError(
      "Ocurrio un error en el mapeo de la operacion ",
      error.message
    );
  }
};

export default createMedicamentInOrderCtrl;
