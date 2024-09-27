import {
  AttendentPlace,
  RequestTreatingPhysician,
  SociodemographicDetails,
  User,
} from "../../databaseConfig.js";
import contextService from "request-context";

export const getRequestHandler = async ({ status, isActive, senderType }) => {
  try {
    const currentUser = contextService.get("request:user");
    const role = currentUser.role;

    let query = {
      where: {},
      attributes: ["id", "createdAt"],
      include: [],
    };

    if (role === "Paciente") {
      query.where.patient = currentUser.userId;
      query.include.push({
        model: User,
        as: "physicianRequest",
        attributes: ["name", "lastname", "email", "idNumber"],
        include: {
          model: AttendentPlace,
          as: "attendancePlace",
        },
      });
    } else if (role === "Médico") {
      query.where.physician = currentUser.userId;
      query.include.push({
        model: User,
        as: "patientRequest",
        attributes: ["name", "lastname", "email", "idNumber"],
        include: {
          model: SociodemographicDetails,
          as: "socDemDet",
          attributes: ["centerAttention"],
        },
      });
    } else {
      throw new Error("Tipo de usuario no válido");
    }

    if (status) {
      query.where.status = status;
    }
    if (isActive !== undefined) {
      query.where.isActive = isActive;
    }
    if (senderType) {
      query.where.senderType = senderType;
    }

    const request = await RequestTreatingPhysician.findAll(query);
    return request;
  } catch (error) {
    throw new Error("Error al recuperar las solicitudes: " + error.message);
  }
};
