import contextService from "request-context";
import patchPhysicianProfileHandler from "../../../handlers/user/profile/patchPhysicianProfileHandler.js";

const patchUserProfileController = async (req, res) => {
  try {
    const user = contextService.get("request:user");
    const { userData, onboardingData } = req.body;
    if (user.role === "Médico") {
      const response = await patchPhysicianProfileHandler({
        id: user.userId,
        userData,
        onboardingData
      });
      return res.status(200).json(response);
    } else if (user.role === "Paciente") {
        return res.status(200).json("asd")
    }
    
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export default patchUserProfileController;
