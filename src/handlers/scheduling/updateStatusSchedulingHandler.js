import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateStatusSchedulingHandler = async (scheduleId) => {
  const schedule = await models.AppointmentScheduling.findOne({
    where: {
      id: scheduleId,
    },
  });

  if (!schedule) {
    throw new SegimedAPIError("No existe la cita", 404);
  }

  if (schedule.status === 3) {
    throw new SegimedAPIError("La cita ya fue cancelada", 400);
  }

  if (schedule.status === 2) {
    throw new SegimedAPIError("La cita ya fue finalizada", 400);
  }
  if (schedule.status === 6) {
    schedule.status = 1;
    await schedule.save();
    return "cita agendada correctamente";
  }
};

export default updateStatusSchedulingHandler;
