import { RequestTreatingPhysician, User } from "../../databaseConfig.js";

export const deleteRequestHandler = async (id) => {
  try {
    const request = await RequestTreatingPhysician.findByPk(id);
    if (!request) {
      throw new Error("Solicitud no encontrada");
    }
    const patient = await User.findByPk(request.patient);
    patient.treatingPhysician = null;
    await patient.save();
    request.isActive = false;
    await request.save();

    return "Solicitud eliminada exitosamente";
  } catch (error) {
    throw new Error("Error al eliminar la solicitud: " + error.message);
  }
};
