import contextService from "request-context";
import getAllSchedulesByUserHandler from "../../handlers/scheduling/getAllSchedulesByUserHandler.js";

const getAllSchedulesByUserController = async (req, res) => {
  try {
    const userId = contextService.get("request:user").userId;
    const userRole = contextService.get("request:user").role;
    const schedules = await getAllSchedulesByUserHandler(userId, userRole);
    return res.status(200).json(schedules);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getAllSchedulesByUserController;
