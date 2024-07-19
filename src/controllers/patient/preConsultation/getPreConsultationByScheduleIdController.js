import getPreConsultationByScheduleIdHandler from "../../../handlers/patient/preConsultation/getPreConsultationByScheduleIdHandler.js";

const getPreConsultationByScheduleIdController = async (req, res) => {
  try {
    const { scheduleId } = req.query;
    const preConsultation = await getPreConsultationByScheduleIdHandler(
      scheduleId
    );
    return res.status(200).json(preConsultation)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getPreConsultationByScheduleIdController;
