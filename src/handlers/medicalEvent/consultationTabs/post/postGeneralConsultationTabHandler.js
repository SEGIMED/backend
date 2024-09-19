import models from "../../../../databaseConfig.js";
import postBackgroundTabHandler from "./postBackgroundTabHandler.js";
import postConsultationTabHandler from "./postConsultationTabHadler.js";

const postGeneralConsultationTabHandler = async ({
  id,
  consultationData,
  backgroundData,
}) => {
  try {
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
    const { vitalSigns, diagnostics, medicalEvent, physicalExamination } =
      consultationData;
    const { risks, hpGroupIds, background } = backgroundData;

    const consultationResponse = await postConsultationTabHandler({
      id,
      vitalSigns,
      diagnostics,
      appointmentSchedule,
      medicalEvent,
      physicalExamination,
    });
    const backgroundResponse = await postBackgroundTabHandler({
      id,
      risks,
      hpGroupIds,
      background,
    });
    appointmentSchedule.schedulingStatus = 2;
    appointmentSchedule.save();
    return { consultationResponse, backgroundResponse };
  } catch (error) {
    console.log(error);
    throw new Error(
      "Ocurrió un error al guardar los cambios generales de la consulta: " +
        error.message
    );
  }
};
export default postGeneralConsultationTabHandler;
