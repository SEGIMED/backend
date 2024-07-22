import getAllScheduleHandler from "../../handlers/managementSchedule/getAllScheduleHandler.js";
import getScheduleByIdHandler from "../../handlers/managementSchedule/getScheduleByIdHandler.js";

const getSchedules = async (req, res) => {
  if(req.query.id){
    const { id } = req.query;
    try {
      const data = await getScheduleByIdHandler(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    try {
      const data = await getAllScheduleHandler();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default getSchedules;
