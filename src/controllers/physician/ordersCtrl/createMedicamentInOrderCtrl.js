import validateDrugCreationData from "../../../validations/validateDrugCreation.js";
import { validateDrugPrescriptionInput } from "../../../validations/validateDrugPrescriptionInput.js";
import drugCreationHandler from "../../../handlers/drugPrescription/drugCreationHandler.js";
import createDrugPrescriptionHandler from "../../../handlers/drugPrescription/createDrugPrescriptionHandler.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const createMedicamentInOrderCtrl = async (
  body,
  patientId,
  newOrderId,
  transaccion
) => {
  try {
    if (!body || body.length === 0) {
      throw new SegimedAPIError(
        "No se ha enviado informacion de medicamentos para la orden medica"
      );
    }
    if (Array.isArray(body) === false) {
      throw new SegimedAPIError(
        "El cuerpo de la solicitud debe ser un arreglo de objetos"
      );
    }
    const response = await Promise.all(
      body.map(
        async ({
          // destructuramos los datos de la solicitud
          drugDetailPresentationId,
          drugCreation,
          prescriptionCreation,
        }) => {
          // validamos los datos de la solicitud
          validateDrugPrescriptionInput({
            drugDetailPresentationId,
            drugCreation,
            prescriptionCreation,
          });
          validateDrugCreationData(drugCreation);
          // asignamos el id de la orden medica y el id del paciente
          prescriptionCreation.medicalOrderId = newOrderId;
          prescriptionCreation.patientId = patientId;

          // si hay un id de medicamento, lo asignamos a la variable lo mismo con el nombre comercial
          let drugDetailId = drugDetailPresentationId;
          let commercialNameId = drugCreation.commercialDrugName;

          // si no hay id de medicamento, creamos uno nuevo
          if (!drugDetailId) {
            const createdDrugDetail = await drugCreationHandler(
              drugCreation,
              transaccion
            );
            // luego de crear el medicamento, asignamos el id del medicamento y el id del nombre comercial
            drugDetailId = createdDrugDetail.id;
            commercialNameId = createdDrugDetail.commercialNameDrugId;
          }

          // creamos la prescripcion
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
