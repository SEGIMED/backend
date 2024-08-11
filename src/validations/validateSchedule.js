import { AppointmentScheduling } from "../databaseConfig.js";
import moment from "moment-timezone";
import SegimedAPIError from "../error/SegimedAPIError.js";
import { Op } from "sequelize";

const TZ = process.env.TZ;

const validateSchedule = async (physicianId, startTimestamp, endTimestamp) => {
  const start = moment.tz(startTimestamp, "YYYY-MM-DD HH:mm:ss Z", TZ);
  const end = moment.tz(endTimestamp, "YYYY-MM-DD HH:mm:ss Z", TZ);

  // Validar que las fechas no sean anteriores al momento actual
  if (start.isBefore(moment())) {
    throw new SegimedAPIError(
      "No se pueden agendar citas en fechas anteriores al momento actual",
      400
    );
  }
  // Validar que start es anterior a end y que no son iguales
  if (start.isSame(end)) {
    throw new SegimedAPIError(
      "La fecha de inicio y la fecha de fin no pueden ser el mismo horario",
      400
    );
  }

  if (start.isAfter(end)) {
    throw new SegimedAPIError(
      "La fecha de inicio debe ser anterior a la fecha de fin",
      400
    );
  }

    // Validar que el horario del médico no esté ocupado
    const overlappingSchedules = await AppointmentScheduling.findAll({
        where: {
            physician: physicianId,
            [Op.or]: [
                {
                    // CASO 1: Nueva cita comienza antes de que termine una cita existente y termina después de que comience la cita existente
                    [Op.and]: [
                        { scheduledStartTimestamp: { [Op.lt]: end.toISOString() } },
                        { scheduledEndTimestamp: { [Op.gt]: start.toISOString() } }
                    ]
                },
                {
                    // CASO 2: Nueva cita comienza durante una cita existente y termina después de que termine la cita existente
                    [Op.and]: [
                        { scheduledStartTimestamp: { [Op.lt]: end.toISOString() } },
                        { scheduledStartTimestamp: { [Op.gt]: start.toISOString() } }
                    ]
                },
                {
                    // CASO 3: Nueva cita comienza antes de que comience una cita existente y termina durante la cita existente
                    [Op.and]: [
                        { scheduledEndTimestamp: { [Op.gt]: start.toISOString() } },
                        { scheduledEndTimestamp: { [Op.lt]: end.toISOString() } }
                    ]
                },
                {
                    // CASO 4 : Nueva cita abarca completamente una cita existente
                    [Op.and]: [
                        { scheduledStartTimestamp: { [Op.gte]: start.toISOString() } },
                        { scheduledEndTimestamp: { [Op.lte]: end.toISOString() } }
                    ]
                }
            ]
        }
    });

  if (overlappingSchedules.length > 0) {
    throw new SegimedAPIError(
      "El médico ya tiene una consulta en esta franja horaria",
      400
    );
  }
};

export default validateSchedule;
