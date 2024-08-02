import { AppointmentScheduling,
  MedicalEvent,
  ProvisionalPreConsultation,
  sequelize, } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import Notify from "../../realtime_server/models/Notify.js";
import validateAllowedDate from "../../validations/validateAllowedDate.js";

const createSchedulingHandler = async (body) => {
  const transaction = await sequelize.transaction()
  try {
    const startTimeValidate = validateAllowedDate(body.scheduledStartTimestamp)
    const endTimeValidate = validateAllowedDate(body.scheduledEndTimestamp)
    if(!endTimeValidate||!startTimeValidate) throw new Error ('Formato de fecha inválido, no esposible crear la cita')

      const newScheduling = await AppointmentScheduling.create(body,{transaction});
       
    if(newScheduling){
      //Notification patient
      const appointmentStart = new Date(newScheduling.scheduledStartTimestamp);
      const newNotificationPatient = new Notify({
        content: {
          notificationType:"appointmentCreated",
          date: appointmentStart.toLocaleDateString(),
          hour: appointmentStart.toLocaleTimeString(),
          scheduleId: newScheduling.id
        },
        target: newScheduling.patient,
      });
      newNotificationPatient.save({transaction});
      //Notification physician
      const newNotificationPhysician = new Notify({
        content: { 
          notificationType:"appointmentCreated",
          date: appointmentStart.toLocaleDateString(),
          hour: appointmentStart.toLocaleTimeString(),
          scheduleId: newScheduling.id
        },
        target: newScheduling.physician,
      });
      newNotificationPhysician.save({transaction});
      const newMedicalEvent = await MedicalEvent.create(
        {
          scheduling: newScheduling.id,
        },
        {
          returning: true,
          plain: true,
          transaction
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
          transaction
        }
      );
      newScheduling.setDataValue('medicalEventId', newMedicalEvent.id);
      newScheduling.setDataValue('preConsultationId', newPreConsultation.id);

      await transaction.commit()
    return newScheduling;
    }
    
  } catch (error) {
    await transaction.rollback();
    throw new SegimedAPIError("Error al crear el agendamiento"+ error.message, 500);
  }
};

export default createSchedulingHandler;
