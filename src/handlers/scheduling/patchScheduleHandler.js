import {AppointmentScheduling} from "../../databaseConfig.js";
import Notify from "../../realtime_server/models/Notify.js";
import validateAllowedDate from "../../validations/validateAllowedDate.js";

const regexPositiveNumbers = /^[1-9][0-9]*$/;

const patchScheduleHandler = async (id, updates) => {
  try {
    if (!regexPositiveNumbers.test(id)) {
      throw new Error("El id del evento debe ser un entero positivo");
    }
    const schedule = await AppointmentScheduling.findByPk(id);

    //Validations
    if (schedule.length === 0) throw new Error("Evento no encontrado");
    const startTimeValidate = validateAllowedDate(updates.scheduledStartTimestamp)
    const endTimeValidate = validateAllowedDate(updates.scheduledEndTimestamp)
    if(!endTimeValidate||!startTimeValidate) throw new Error ('Formato de fecha inválido, no se pudo actualizar la cita')
    
    //Updates
    if(updates?.scheduledStartTimestamp!=schedule.scheduledStartTimestamp && updates?.schedulingStatus!=3){
      const appointmentStart = new Date(schedule.scheduledStartTimestamp);
      const newAppointmentStart = new Date(updates.scheduledStartTimestamp);
       //Notification patient updatedAppointment
      const newNotificationPatient = new Notify({
        content: {
          notificationType:"updatedAppointment",
          pastDate: appointmentStart.toLocaleDateString(),
          pastHour: appointmentStart.toLocaleTimeString(),
          currentDate: newAppointmentStart.toLocaleDateString(),
          currentHour: newAppointmentStart.toLocaleTimeString()
        },
        target: schedule.patient,
      });
      newNotificationPatient.save();
      //Notification physician updatedAppointment
      const newNotificationPhysician = new Notify({
        content: {
          notificationType:"updatedAppointment",
          pastDate: appointmentStart.toLocaleDateString(),
          pastHour: appointmentStart.toLocaleTimeString(),
          currentDate: newAppointmentStart.toLocaleDateString(),
          currentHour: newAppointmentStart.toLocaleTimeString()
        },
        target: schedule.physician,
      });
      newNotificationPhysician.save();
    }
//TODO validaciones en hora y fecha, para que sean en formatos válidos.
//TODO validate if updates?.schedulingStatus exists before the next if
  //Notification patient
    if(updates?.schedulingStatus==3){
      const appointmentStart = new Date(schedule.scheduledStartTimestamp);
      const newNotificationPatient = new Notify({
        content: {
          notificationType:"appointmentCanceled",
          date: appointmentStart.toLocaleDateString(),
          hour: appointmentStart.toLocaleTimeString()
        },
        target: schedule.patient,
      });
      newNotificationPatient.save();
      //Notification physician updatedAppointment
      const newNotificationPhysician = new Notify({
        content: {
          notificationType:"appointmentCanceled",
          date: appointmentStart.toLocaleDateString(),
          hour: appointmentStart.toLocaleTimeString()
        },
        target: schedule.physician,
      });
      newNotificationPhysician.save();
    }
    await schedule.update(updates);
    return schedule;
  } catch (error) {
    throw new Error("Error cargando el evento: " + error.message);
  }
};

export default patchScheduleHandler;
