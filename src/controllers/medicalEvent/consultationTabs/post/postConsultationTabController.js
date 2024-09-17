import models from "../../../../databaseConfig.js";
import postConsultationTabHandler from "../../../../handlers/medicalEvent/consultationTabs/post/postConsultationTabHadler.js";

const postConsultationTabController = async (req, res) => {
  try {
    const { id } = req.query;
    const { vitalSigns, diagnostics, medicalEvent } = req.body;
    const medicalEventData = await models.MedicalEvent.findOne({
      where: {
        id,
      },
    });
    const appointmentSchedule = await models.AppointmentScheduling.findOne({
      where: {
        id: medicalEventData.scheduling,
      },
    });
    const response = await postConsultationTabHandler({
      id,
      vitalSigns,
      diagnostics,
      appointmentSchedule,
      medicalEvent
    });
    if (response) {
      console.log(response);
      return res
        .status(200)
        .json({ message: "Datos actualizados correctamente." });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export default postConsultationTabController;
