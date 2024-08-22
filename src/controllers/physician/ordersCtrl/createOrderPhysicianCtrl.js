import createNewOrderHandler from "../../../handlers/physicianHandlers/orders/createNewOrderHandlers.js";
import contextService from "request-context";

const createOrderPhysicianCtrl = async (req, res) => {
  try {
    const { body } = req;
    const newOrder = await createNewOrderHandler(body);
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default createOrderPhysicianCtrl;
