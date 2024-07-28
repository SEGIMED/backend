import {
  AppointmentScheduling,
  MedicalEvent,
  ProvisionalPreConsultation,
} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import Notify from "../../realtime_server/models/Notify.js";

const createSchedulingHandler = async (body) => {
  try {
    const newScheduling = await AppointmentScheduling.create(body);

    if (newScheduling) {
      //Notification patient
      const appointmentStart = new Date(newScheduling.scheduledStartTimestamp);
      const newNotificationPatient = new Notify({
        content: {
          message: `Usted ha agendado una cita médica: 
          Fecha: ${appointmentStart.toLocaleDateString()}
          Hora: ${appointmentStart.toLocaleTimeString()}`,
        },
        target: newScheduling.patient,
      });
      newNotificationPatient.save();
      //Notification physician
      const newNotificationPhysician = new Notify({
        content: {
          message: `Usted tiene una nueva cita médica para atender el: 
          Fecha: ${appointmentStart.toLocaleDateString()}
          Hora: ${appointmentStart.toLocaleTimeString()}`,
        },
        target: newScheduling.physician,
      });
      newNotificationPhysician.save();

      const newMedicalEvent = await MedicalEvent.create(
        {
          scheduling: newScheduling.id,
        },
        {
          returning: true,
          plain: true,
        }
      );
      const newPreConsultation = await ProvisionalPreConsultation.create(
        {
          patient: body.patient,
          appointmentSchedule: newScheduling.id,
        },
        {
          returning: true,
          plain: true,
        }
      );
      newScheduling.setDataValue('medicalEventId', newMedicalEvent.id);
      newScheduling.setDataValue('preConsultationId', newPreConsultation.id);

      return newScheduling;
    }
  } catch (error) {
    console.log(error);
    throw new SegimedAPIError("Error al crear el agendamiento", 500);
  }
};

export default createSchedulingHandler;
