import contextService from "request-context";
import patchPhysicianProfileHandler from "../../../handlers/user/profile/patchPhysicianProfileHandler";

const patchUserProfileController = async (req, res) => {
  try {
    const userId = contextService.get("request:user").userId;
    const { userData } = req.body;
    if (user.role === "Médico") {
      const response = await patchPhysicianProfileHandler({
        id: userId,
        userData,
      });
      return res.status(200).json(response);
    } else if (tipo === "Paciente") {
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export default patchUserProfileController;
