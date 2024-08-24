import createNewOrderHandler from "../../../handlers/physicianHandlers/orders/createNewOrderHandlers.js";

const createOrderPhysicianCtrl = async (req, res) => {
  try {
    const { body } = req;
    const newOrder = await createNewOrderHandler(body);
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

// se debe dividir el body para que una parte se mande en el medicamentos
// y la otra en la orden medica

export default createOrderPhysicianCtrl;
