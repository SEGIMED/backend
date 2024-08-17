import createOnbordingHandler from "../../handlers/onbording/createOnbordingHandler.js";
import { createOnbPhysician } from "../../handlers/onbording/createOnbPhysician.js";
import contextService from "request-context";

const createOnboardingController = async (req, res) => {
  const userId = contextService.get("request:user").userId;
  if (!req.query.tipo) {
    return res.status(400).json({ error: "Tipo de onbording no informado" });
  }
  const { tipo } = req.query;
  if (tipo === "2") {
    try {
      const newOnbPhysician = req.body;
      const onbording = await createOnbPhysician(newOnbPhysician, userId);
      return res.status(200).json(onbording);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (tipo === "3") {
    try {
      const newOnbording = req.body;
      const onbording = await createOnbordingHandler(newOnbording, userId);
      return res.status(200).json(onbording);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
export default createOnboardingController;
