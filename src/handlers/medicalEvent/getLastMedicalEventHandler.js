import models from "../../databaseConfig.js";
import getConsultationTabHandler from "./consultationTabs/get/getConsultationTabHandler.js";

const getLastMedicalEventHandler = async ({ id, forBackground = false }) => {
  try {
    const medicalEventData = await models.MedicalEvent.findByPk(id);
    if (!medicalEventData) throw new Error("No se encontró la consulta");

    const schedule = await models.AppointmentScheduling.findOne({
      where: {
        id: medicalEventData.scheduling,
      },
    });
    if (!schedule) throw new Error("No se encontró un agendamiento asociado");

    const allSchedules = await models.AppointmentScheduling.findAll({
      where: {
        patient: schedule.patient,
        physician: schedule.physician,
        schedulingStatus: 2,
      },
      include: {
        model: models.MedicalEvent,
        as: "medicalEvent",
      },
      order: [["scheduled_start_timestamp", "DESC"]],
      limit: 1,
    });
    if (forBackground) {
      if (!allSchedules.length || !allSchedules[0].medicalEvent) {
        return null;
      }
      return allSchedules[0].medicalEvent.id;
    }
    if (!allSchedules.length || !allSchedules[0].medicalEvent) {
      throw new Error("No se encontró una consulta médica anterior");
    }

    const lastMedicalEvent = await getConsultationTabHandler({
      id: allSchedules[0].medicalEvent.id,
    });

    return lastMedicalEvent;
  } catch (error) {
    throw new Error(
      "Ocurrió un error al recuperar los datos de la última consulta: " +
        error.message
    );
  }
};

export default getLastMedicalEventHandler;
