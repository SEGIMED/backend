import {AppointmentScheduling} from "../../databaseConfig.js";
import Notify from "../../realtime_server/models/Notify.js";

const regexPositiveNumbers = /^[1-9][0-9]*$/;

const patchScheduleHandler = async (id, updates) => {
  try {
    if (!regexPositiveNumbers.test(id)) {
      throw new Error("El id del evento debe ser un entero positivo");
    }
    const schedule = await AppointmentScheduling.findByPk(id);
    if (schedule.length === 0) throw new Error("Evento no encontrado");
  //TODO test the next logic
    if(updates.scheduledStartTimestamp!=schedule.scheduledStartTimestamp){
      const appointmentStart = new Date(schedule.scheduledStartTimestamp);
      const newAppointmentStart = new Date(updates.scheduledStartTimestamp);
      const newNotification = new Notify({
        content: {
          message: 
          `Su cita para : 
          Fecha: ${appointmentStart.toLocaleDateString()}
          Hora: ${appointmentStart.toLocaleTimeString()}
          Ha sido cambiada para el:  
          Fecha: ${newAppointmentStart.toLocaleDateString()}
          Hora: ${newAppointmentStart.toLocaleTimeString()}`
          ,
        },
        target: updates.patient,
      });
      newNotification.save();
    }
//TODO validate if pdates?.schedulingStatus exists before the next if
    // console.log(updates.patient)
    if(updates?.schedulingStatus===3){
      const appointmentStart = new Date(schedule.scheduledStartTimestamp);
      const newNotification = new Notify({
        content: {
          message: 
          `Su cita para el : 
          Fecha: ${appointmentStart.toLocaleDateString()}
          Hora: ${appointmentStart.toLocaleTimeString()}
          Ha sido cancelada `,
        },
        target: updates.patient,
      });
      newNotification.save();
    }
    await schedule.update(updates);
    return schedule;
  } catch (error) {
    throw new Error("Error cargando el evento: " + error.message);
  }
};

export default patchScheduleHandler;
