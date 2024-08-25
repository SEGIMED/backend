import { DoctorSchedule } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getScheduleByIdHandler = async (id) => {
  try {
    const data = await DoctorSchedule.findAll({
      where: {
        doctor_id: id,
      },
    });
    return data;
  } catch (error) {
    throw new SegimedAPIError("Error en la busqueda");
  }
};
export default getScheduleByIdHandler;
