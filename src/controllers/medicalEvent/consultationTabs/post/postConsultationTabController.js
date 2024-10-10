import models from "../../../../databaseConfig.js";
import postConsultationTabHandler from "../../../../handlers/medicalEvent/consultationTabs/post/postConsultationTabHadler.js";

const postConsultationTabController = async (req, res) => {
  try {
    const { id } = req.query;
    const {
      vitalSigns,
      diagnostics,
      medicalEvent,
      physicalExamination,
      glycemia,
      abnormalGlycemia,
      functionalClass,
      medicalProcedure,
    } = req.body;
    const medicalEventData = await models.MedicalEvent.findOne({
      where: {
        id,
      },
    });
    if (!medicalEventData) {
      return res.status(404).send("La consulta no es válida.");
    }
    const appointmentSchedule = await models.AppointmentScheduling.findOne({
      where: {
        id: medicalEventData.scheduling,
      },
    });
    if (!appointmentSchedule) {
      return res
        .status(404)
        .send("La consulta no tiene un agendamiento válido.");
    }
    const response = await postConsultationTabHandler({
      id,
      vitalSigns,
      diagnostics,
      appointmentSchedule,
      medicalEvent,
      physicalExamination,
      glycemia,
      abnormalGlycemia,
      functionalClass,
      medicalProcedure,
    });

    const anyFailed = Object.values(response).some((value) => value === false);

    if (anyFailed) {
      throw new Error("Algunas actualizaciones fallaron.");
    }
    return res
      .status(200)
      .json({ message: "Datos actualizados correctamente." });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export default postConsultationTabController;
