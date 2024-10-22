
import models from "../../databaseConfig.js";
import Notify from "../../realtime_server/models/Notify.js";
import contextService from "request-context";
export const createRequestHandler = async (physicianId, patientId) => {
  try {
    const sender = contextService.get("request:user");
    const senderType = sender.role;
    if (!["Paciente", "Médico"].includes(senderType)) {
      throw new Error("Tipo de remitente inválido.");
    }
    const physician = await models.User.findByPk(physicianId);
    const patient = await models.User.findByPk(patientId);
    let receptor;
    if (!physician) {
      throw new Error("Médico no encontrado.");
    }
    if (!patient) {
      throw new Error("Paciente no encontrado.");
    }
    const existingRequest = await models.RequestTreatingPhysician.findOne({
      where: {
        patient: patientId,
        status: "Pendiente",
      },
    });
    if (senderType === "Paciente") {
      if (existingRequest) {
        throw new Error("El paciente ya tiene una solicitud activa.");
      } else {
        receptor = physician;
      }
    } else {
      receptor = patient;
    }
    const newRequest = await models.RequestTreatingPhysician.create({
      patient: patientId,
      physician: physicianId,
      senderType,
    });
    const newNotification = new Notify({
      content: {
        notificationType: "requestTreatingPhysicianCreated",
        name: sender.name,
        lastName: sender.lastname,
      },
      target: receptor.id,
    });
    await newNotification.save();
    return newRequest;
  } catch (error) {
    throw new Error("Error al crear la solicitud: " + error.message);
  }
};