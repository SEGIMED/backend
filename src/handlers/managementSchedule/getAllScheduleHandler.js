import { User, DoctorSchedule } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getAllScheduleHandler = async () => {
  try {
    const data = await DoctorSchedule.findAll({
      include: {
        model: User,
        attributes: ["name"],
      },
    });
    const response = data.map(
      ({ doctor_id, date, start_time, end_time, User }) => {
        return {
          doctor_id,
          date,
          start_time,
          end_time,
          doctor: User.name,
        };
      }
    );
    return response;
  } catch (error) {
    throw new SegimedAPIError("error al traer los registros");
  }
};

export default getAllScheduleHandler;
