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
          `<p>Su cita para : </p>
          <p>Fecha: ${appointmentStart.toLocaleDateString()}</p>
          <p>Hora: ${appointmentStart.toLocaleTimeString()}</p>
          <p>Ha sido cambiada para el:  </p>
          <p>Fecha: ${newAppointmentStart.toLocaleDateString()}</p>
          <p>Hora: ${newAppointmentStart.toLocaleTimeString()}</p>`
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
          message: `<p>Su cita para el : </p>
          <p>Fecha: ${appointmentStart.toLocaleDateString()}</p>
          <p>Hora: ${appointmentStart.toLocaleTimeString()}</p>
          <p>Ha sido cancelada</p> `,
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
