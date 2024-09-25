import contextService from "request-context";
import getPatientProfileHandler from "../../../handlers/user/profile/getPatientProfileHandler.js";
import getPhysicianProfileHandler from "../../../handlers/user/profile/getPhysicianProfileHandler.js";

const getUserProfileInfoController = async (req, res) => {
  try {
    const user = contextService.get("request:user");
    if (user.role === "Paciente") {
      const response = await getPatientProfileHandler({
        id: user.userId,
        role: user.role,
      });
      return res.status(200).json(response);
    } else if (user.role === "Médico") {
      const response = await getPhysicianProfileHandler({
        id: user.userId,
        role: user.role,
      });
      return res.status(200).json(response);
    } else {
      throw new Error("Rol no válido");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export default getUserProfileInfoController;
