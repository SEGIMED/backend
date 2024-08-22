import getOrderByIdPhysician from "../../../handlers/physicianHandlers/orders/getOrderByIdPhysician.js";
import getOrdersByIdHandlersPhysician from "../../../handlers/physicianHandlers/orders/getOrdersById.js";
import contextService from "request-context";

const getPhysicianOrderById = async (req, res) => {
  try {
    // Si se envia el query orderId se obtiene la orden por ese id
    if (req.query.orderId !== undefined) {
      const { orderId } = req.query;
      const orders = await getOrdersByIdHandlersPhysician(orderId);
      res.status(200).json(orders);
    }
    // Si no se envia el query orderId se obtienen todas las ordenes del medico
    const orders = await getOrderByIdPhysician();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default getPhysicianOrderById;
