import createDrugPrescriptionHandler from "../../../handlers/drugPrescription/createDrugPrescriptionHandler.js";
import createNewOrderHandler from "../../../handlers/physicianHandlers/orders/createNewOrderHandlers.js";
import { sequelize } from "../../../databaseConfig.js";
import validateDrugCreationData from "../../../validations/validateDrugCreation.js";
import { validateDrugPrescriptionInput } from "../../../validations/validateDrugPrescriptionInput.js";
import drugCreationHandler from "../../../handlers/drugPrescription/drugCreationHandler.js";

const createOrderPhysicianCtrl = async (req, res) => {
  const transaction = await sequelize.transaction();
  let mediacalRegister;
  let requestId;
  try {
    const { body } = req;
    // invocamos el handler de la orden medica
    const newOrder = await createNewOrderHandler(body, transaction);
    if (body.bodyMedicam) {
      // validamos el body de la solicitud de medicamentos
      validateDrugPrescriptionInput(req.body.bodyMedicam);
      validateDrugCreationData(req.body.bodyMedicam.drugCreation);

      // * destructuramos el objeto de los medicamentos
      const { drugDetailPresentationId, drugCreation, prescriptionCreation } =
        body.bodyMedicam;

      // asignamos a al objeto de la prescripcion medica el id de la orden medica
      prescriptionCreation.medicalOrderId = newOrder.id;

      let drugDetailId = drugDetailPresentationId;
      let commercialNameId = drugCreation.commercialDrugName;
      if (!drugDetailId) {
        const createdDrugDetail = await drugCreationHandler(
          drugCreation,
          transaction
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
        transaction
      );
      mediacalRegister;
    }

    // confirmamos la transaccion
    await transaction.commit();

    // creamos el objeto de respuesta
    const response = {
      newOrder,
    };

    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    if (transaction) {
      await transaction.rollback();
    }
    res.status(500).json({ error: error.message });
  }
};

export default createOrderPhysicianCtrl;
