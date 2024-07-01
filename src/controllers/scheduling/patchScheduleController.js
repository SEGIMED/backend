import patchScheduleHandler from "../../handlers/scheduling/patchScheduleHandler.js";

const patchScheduleController = async (req, res) => {
  try {
    const { id } = req.params;
    const scheduleUpdated = await patchScheduleHandler(id, req.body);

    return res.status(200).json(scheduleUpdated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default patchScheduleController;
