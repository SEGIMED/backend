import { where } from "sequelize";
import { RequestTreatingPhysician, User } from "../../databaseConfig.js";

export const updateTreatingPhysicianHandler = async (body) => {
  const { id, status } = body;

  try {
    const request = await RequestTreatingPhysician.findByPk(id);
    if (!request) {
      throw new Error("Solicitud no encontrada");
    }

    if (status === "Aceptada") {
      const patient = await User.findByPk(request.patient);
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
