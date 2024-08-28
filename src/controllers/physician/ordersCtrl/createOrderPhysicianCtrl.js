import createNewOrderHandler from "../../../handlers/physicianHandlers/orders/createNewOrderHandlers.js";
import { sequelize } from "../../../databaseConfig.js";
import { createDrugPrescriptions } from "../../drugPrescription/drugPrescriptionHelper.js";

const createOrderPhysicianCtrl = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { body } = req;
    // invocamos el handler de la orden medica
    const newOrder = await createNewOrderHandler(body, transaction);
    if (body.bodyMedicam) {
      // validamos el body de la solicitud de medicamentos
      body.bodyMedicam.forEach((med) => {
        med.prescriptionCreation.medicalOrderId = newOrder.id;
      });
      const responseMed = await createDrugPrescriptions(
        body.bodyMedicam,
        transaction
      );
      console.log(responseMed);
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
