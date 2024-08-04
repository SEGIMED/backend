import createOnbordingHandler from "../../handlers/onbording/createOnbordingHandler.js";
import { createOnbPhysician } from "../../handlers/onbording/createOnbPhysician.js";

const createOnbordingController = async (req, res) => {
  if (!req.query.tipo) {
    return res.status(400).json({ error: "Tipo de onbording não informado" });
  }
  const { tipo, userId } = req.query;
  if (tipo === 1) {
    try {
      const newOnbPhysician = req.body;
      const onbording = await createOnbPhysician(newOnbPhysician, userId);
      return res.status(200).json(onbording);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (tipo === 2) {
    try {
      const newOnbording = req.body;
      const onbording = await createOnbordingHandler(newOnbording, userId);
      return res.status(200).json(onbording);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
export default createOnbordingController;
