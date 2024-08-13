import createOrUpdateMedicalInterconsultationHandler from "../../handlers/interconsultation/createOrUpdateMedicalInterconsultationHandler.js";

const createOrUpdateMedicalInterconsultationController = async (req, res) => {
  try {
    const medicalInterconsultationData = req.body;
    const interconsultation =
      await createOrUpdateMedicalInterconsultationHandler(
        medicalInterconsultationData
      );

    return res.status(200).json(interconsultation);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default createOrUpdateMedicalInterconsultationController;
