import createNewOrderHandler from "../../../handlers/physicianHandlers/orders/createNewOrderHandlers.js";
import { sequelize } from "../../../databaseConfig.js";
import createMedicamentInOrderCtrl from "./createMedicamentInOrderCtrl.js";

const createOrderPhysicianCtrl = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { body } = req;
    const { patientId } = body;
    // invocamos el handler de la orden medica
    const newOrder = await createNewOrderHandler(body, transaction);
    if (body.bodyMedicam) {
      // validamos el body de la solicitud de medicamentos
      const responseMed = await createMedicamentInOrderCtrl(
        body.bodyMedicam,
        patientId,
        newOrder.id,
        transaction
      );
      // imprime la respuesta de la solicitud de medicamentos
      console.log(JSON.stringify(responseMed, null, 2));
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
