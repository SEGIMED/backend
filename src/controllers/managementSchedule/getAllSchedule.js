import getAllScheduleHandler from "../../handlers/managementSchedule/getAllScheduleHandler.js";

const getAllSchedules = async (req, res) => {
  try {
    const response = await getAllScheduleHandler();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.error(error.message);
  }
};

export default getAllSchedules;
