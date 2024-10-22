import contextService from "request-context";
import patchPhysicianProfileHandler from "../../../handlers/user/profile/patchPhysicianProfileHandler.js";
import patchPatientProfileHandler from "../../../handlers/user/profile/patchPatientProfileHandler.js";

const patchUserProfileController = async (req, res) => {
  try {
    const user = contextService.get("request:user");
    const { userData, onboardingData } = req.body;
    if (user.role === "Médico") {
      const response = await patchPhysicianProfileHandler({
        id: user.userId,
        userData,
        onboardingData,
      });
      return res.status(200).json(response);
    } else if (user.role === "Paciente") {
      const response = await patchPatientProfileHandler({
        id: user.userId,
        userData,
        onboardingData
      });
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export default patchUserProfileController;
