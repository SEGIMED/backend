import updateSociodemographicDetailsController from "../../controllers/sociodemographicDetails/updateSociodemographicDetailsController.js";
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
  
    if(updates.scheduledStartTimestamp!==schedule.scheduledStartTimestamp){
      const appointmentStart = new Date(updates.scheduledStartTimestamp);

      const newNotification = new Notify({
        content: {
          message: `<p>Usted a cambiado su cita para : </p>
          <p>Fecha: ${appointmentStart.toLocaleDateString()}</p>
          <p>Hora: ${appointmentStart.toLocaleTimeString()}</p> `,
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
