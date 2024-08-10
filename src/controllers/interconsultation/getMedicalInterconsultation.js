import contextService from "request-context";
import getMedicalInterconsultationHandler from "../../handlers/interconsultation/getMedicalInterconsultationHandler.js";

const getMedicalInterconsultationController = async (req, res) => {
  try {
    const resss = "hola eso es get ";
    return res.status(200).json(resss);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getMedicalInterconsultationController;
