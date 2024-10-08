import getOrderByIdPhysician from "../../../handlers/physicianHandlers/orders/getOrderByIdPhysician.js";
import getOrdersByIdHandlersPhysician from "../../../handlers/physicianHandlers/orders/getOrdersById.js";
import contextService from "request-context";

const getPhysicianOrderById = async (req, res) => {
  try {
    // Si se envia el query orderId se obtiene la orden por ese id
    if (req.query.orderId !== undefined) {
      const { orderId } = req.query;
      const orders = await getOrdersByIdHandlersPhysician(orderId);
      return res.status(200).json(orders);
    }
    // Si no se envia el query orderId se obtienen todas las ordenes del medico
    const { userId } = contextService.get("request:user");
    const { role } = contextService.get("request:user");
    // establecemos la condicion para obtener las ordenes segun el rol
    // si el rol es distinto de paciente se obtienen las orden por el medico
    if (role !== "paciente") {
      const orders = await getOrderByIdPhysician("physicianId", userId);
     return res.status(200).json(orders);
    }
    // Si el rol es paciente se obtienen las ordenes del paciente
    const orders = await getOrderByIdPhysician("patientId", userId);
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export default getPhysicianOrderById;
