import getMedicalEventHistoryAndInterconsultationHandler from "../../handlers/medicalHistory/getMedicalEventHistoryAndInterconsultationHandler.js";
const getMedicalEventHistoryEvolutionController = async (req, res) => {
  try {
    const patientId = req.query.patientId;
    const page = req.query.page;
    const limit = req.query.limit;
    const physicianId = req.query.physicianId;
    const MedicalEventHistory =
      await getMedicalEventHistoryAndInterconsultationHandler(
        patientId,
        physicianId,
        page,
        limit
      );
    return res.status(200).json(MedicalEventHistory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getMedicalEventHistoryEvolutionController;
