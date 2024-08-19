import getOrderByIdPhysician from "../../../handlers/physicianHandlers/orders/getOrderByIdPhysician.js";
import getOrdersByIdHandlersPhysician from "../../../handlers/physicianHandlers/orders/getOrdersById.js";
import contextService from "request-context";

const getPhysicianOrderById = async (req, res) => {
  const userId = contextService.get("request:user").userId;
  try {
    if (req.query.orderId !== undefined) {
      const { orderId } = req.query;
      const orders = await getOrdersByIdHandlersPhysician(orderId);
      res.status(200).json(orders);
    }
    const orders = await getOrderByIdPhysician(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default getPhysicianOrderById;
