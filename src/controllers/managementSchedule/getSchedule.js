import getAllScheduleHandler from "../../handlers/managementSchedule/getAllScheduleHandler.js";
import getScheduleByIdHandler from "../../handlers/managementSchedule/getScheduleByIdHandler.js";

const getSchedules = async (req, res) => {
  if (!req.query.id) {
    try {
      const data = await getAllScheduleHandler();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    try {
      const data = await getScheduleByIdHandler(req.query.id);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export default getSchedules;
