import models from "../../databaseConfig.js";

export const updateTreatingPhysicianHandler = async (body) => {
  const { id, status } = body;
  try {
    const request = await models.RequestTreatingPhysician.findByPk(id);
    if (!request) {
      throw new Error("Solicitud no encontrada");
    }
    if (status === "Aceptada") {
      const patient = await models.User.findByPk(request.patient);
      if (!patient) {
        throw new Error("Paciente no encontrado");
      }
      await User.update(
        { treatingPhysician: request.physician },
        { where: { id: request.patient } }
      );
    }
    request.status = status;
    request.isActive = status === "Aceptada";
    await request.save();
    return request;
  } catch (error) {
    throw new Error("Error al actualizar la solicitud: " + error.message);
  }
};
