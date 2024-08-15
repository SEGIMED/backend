import getMedicalInterconsultationHandler from "../../handlers/interconsultation/getMedicalInterconsultationHandler.js";

const getMedicalInterconsultationController = async (req, res) => {
  try {
    const medicalIntercontultations = await getMedicalInterconsultationHandler(
      req.query
    );
    return res.status(200).json(medicalIntercontultations);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getMedicalInterconsultationController;
