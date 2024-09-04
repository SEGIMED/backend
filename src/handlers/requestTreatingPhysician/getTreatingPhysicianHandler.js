import {
  AttendentPlace,
  CatCenterAttention,
  PhysicianOnboarding,
  RequestTreatingPhysician,
  SociodemographicDetails,
  User,
} from "../../databaseConfig.js";
import contextService from "request-context";

export const getRequestHandler = async () => {
  try {
    const currentUser = contextService.get("request:user");
    const role = currentUser.role;
    let query;
    if (role === "Paciente") {
      query = {
        where: {
          patient: currentUser.userId,
          status: "Pendiente",
          senderType: "Médico",
        },
        attributes: ["id", "createdAt"],
        include: [
          {
            model: User,
            as: "physicianRequest",
            attributes: ["name", "lastname", "email", "idNumber"],
            include: {
              model: AttendentPlace,
              as: "attendancePlace",
            },
          },
        ],
      };
    } else if (role === "Médico") {
      query = {
        where: {
          physician: currentUser.userId,
          status: "Pendiente",
          senderType: "Paciente",
        },
        attributes: ["id", "createdAt"],
        include: [
          {
            model: User,
            as: "physicianRequest",
            attributes: ["name", "lastname", "email", "idNumber"],
            include: {
              model: SociodemographicDetails,
              as: "socDemDet",
              attributes: ["centerAttention"],
            },
          },
        ],
      };
    } else {
      throw new Error("Tipo de usuario no válido");
    }
    const request = await RequestTreatingPhysician.findAll(query);
    return request;
  } catch (error) {
    throw new Error("Error al recuperar las solicitudes: " + error.message);
  }
};
