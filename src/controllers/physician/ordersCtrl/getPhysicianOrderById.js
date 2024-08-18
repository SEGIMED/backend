import getOrdersByIdHandlersPhysician from "../../../handlers/physicianHandlers/orders/getOrdersById.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import contextService from "request-context";

const getPhysicianOrderById = async (req, res) => {
  try {
    const userId = contextService.get("request:user").userId;
    const orders = await getOrdersByIdHandlersPhysician(userId);

    res.status(200).json(orders);
  } catch (error) {
    res.status(error.statusCode).json(error.message);
  }
};

export default getPhysicianOrderById;
