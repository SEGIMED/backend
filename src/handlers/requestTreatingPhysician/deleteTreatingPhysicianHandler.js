import models from "../../databaseConfig.js";

export const deleteRequestHandler = async (id) => {
  try {
    const request = await models.RequestTreatingPhysician.findByPk(id);
    if (!request) {
      throw new Error("Solicitud no encontrada");
    }
    request.isActive = false;
    await request.save();
    return "Solicitud eliminada exitosamente";
  } catch (error) {
    throw new Error("Error al eliminar la solicitud: " + error.message);
  }
};