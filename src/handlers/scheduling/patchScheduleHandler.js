import {AppointmentScheduling} from "../../databaseConfig.js";
const regexPositiveNumbers = /^[1-9][0-9]*$/;

const patchScheduleHandler = async (id, updates) => {
  try {
    if (!regexPositiveNumbers.test(id)) {
      throw new Error("El id del evento debe ser un entero positivo");
    }
    const schedule = await AppointmentScheduling.findByPk(id);
    if (schedule.length === 0) throw new Error("Evento no encontrado");
    await schedule.update(updates);
    return schedule;
  } catch (error) {
    throw new Error("Error cargando el evento: " + error.message);
  }
};

export default patchScheduleHandler;
