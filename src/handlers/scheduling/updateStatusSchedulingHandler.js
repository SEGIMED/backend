import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateStatusSchedulingHandler = async (scheduleId) => {
  try {
    const schedule = await models.AppointmentScheduling.findOne({
      where: {
        id: scheduleId,
      },
    });
    if (!schedule) {
      throw new SegimedAPIError("No se encontró la cita", 404);
    }
    if (schedule.schedulingStatus === 1) {
      throw new SegimedAPIError("La cita ya fue agendada", 400);
    }
    if (schedule.schedulingStatus === 2) {
      throw new SegimedAPIError("La cita ya fue atendida", 400);
    }
    if (schedule.schedulingStatus === 3) {
      throw new SegimedAPIError("La cita ya fue cancelada", 400);
    }
    if (schedule.schedulingStatus === 4) {
      throw new SegimedAPIError("La cita no fue atendida", 400);
    }
    if (schedule.schedulingStatus === 5) {
      throw new SegimedAPIError("La cita fue eliminada", 400);
    }
    if (schedule.schedulingStatus === 7) {
      throw new SegimedAPIError("La cita ya fue resuelta", 400);
    }
    schedule.schedulingStatus = 1;
    schedule.IsApproved = true;

    schedule.save();
    return schedule;
  } catch (error) {
    console.error(error);
    throw new SegimedAPIError(
      "Error en la operacion de actualizacion",
      error.status
    );
  }
};

export default updateStatusSchedulingHandler;
