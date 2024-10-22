import getMedicalHistoryHandler from "../../handlers/medicalEvent/getMedicalHistoryHandler.js";

const getMedicalHistoryController = async (req, res) => {
  try {
    const { userId } = req.query;
    const response = await getMedicalHistoryHandler({ userId });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export default getMedicalHistoryController;
