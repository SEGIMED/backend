import getOrdersByIdHandlersPhysician from "../../../handlers/physicianHandlers/orders/getOrdersById.js";
import contextService from "request-context";

const getPhysicianOrderById = async (req, res) => {
  try {
    const userId = contextService.get("request:user").userId;
    const orders = await getOrdersByIdHandlersPhysician(userId);
    if (orders.length === 0) {
      res.status(200).send("Orders not found");
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(error.statusCode).json(error.message);
  }
};

export default getPhysicianOrderById;
