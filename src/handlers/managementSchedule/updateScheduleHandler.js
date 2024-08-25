import { DoctorSchedule } from "../../databaseConfig.js";
import moment from "moment";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateScheduleHandler = async (id, start_time, end_time) => {
  try {
    await DoctorSchedule.update(
      {
        start_time: moment(start_time, "HH:mm").format("HH:mm"),
        end_time: moment(end_time, "HH:mm").format("HH:mm"),
      },
      {
        where: {
          doctor_id: id,
        },
      }
    );
    const dataUpdate = await DoctorSchedule.findAll({
      where: {
        doctor_id: id,
      },
    });
    return dataUpdate;
  } catch (error) {
    throw new SegimedAPIError("Error al actualizar el registro");
  }
};
export default updateScheduleHandler;
