import createOnbordingHandler from "../../handlers/onbording/createOnbordingHandler.js";
import { createOnbPhysician } from "../../handlers/onbording/createOnbPhysician.js";
import contextService from "request-context";
import { sendMail } from "../../utils/sendMail.js";
import { User } from "../../databaseConfig.js";
import { physicianInformationHtml } from "../../utils/emailTemplates/physicianInformationHtml.js";

const createOnboardingController = async (req, res) => {
  const user = contextService.get("request:user");
  if (user.role === "Médico") {
    try {
      const newOnbPhysician = req.body;
      const onbording = await createOnbPhysician(newOnbPhysician, user.userId);
      if (onbording) {
        const userData = await User.findByPk(user.userId, {
          attributes: { exclude: "password" },
        });
        const frontendUrl = req.headers.referer;
        const link = `${frontendUrl}/physician-verification/${user.userId}`
        await sendMail(
          "gramajoeugenia@gmail.com",
          physicianInformationHtml({ onboarding: onbording, user: userData, link }),
          "Nuevo médico registrado"
        );
      }
      return res.status(200).json(onbording);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (tipo === "Paciente") {
    try {
      const newOnbording = req.body;
      const onbording = await createOnbordingHandler(newOnbording, user.userId);

      return res.status(200).json(onbording);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
export default createOnboardingController;
