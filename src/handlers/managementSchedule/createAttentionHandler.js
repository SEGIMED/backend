import { DoctorSchedule } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment";

const createScheduleHandler = async (idUser, openAtt, closeAtt) => {
  try {
    const response = await DoctorSchedule.create({
      doctor_id: idUser,
      start_time: moment(openAtt, "HH:mm:ss").format("HH:mm:ss"),
      end_time: moment(closeAtt, "HH:mm:ss").format("HH:mm:ss"),
    });
    return response;
  } catch (error) {
    throw new SegimedAPIError("A ocurrido un error con el registro");
  }
};

export default createScheduleHandler;
