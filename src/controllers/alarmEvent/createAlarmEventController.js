import createAlarmEventHandler from "../../handlers/alarmEvent/createAlarmEventHandler.js";

const createAlarmEventController = async (req, res) => {
  try {
    const body = req.body;

    const alarmEventCreated = await createAlarmEventHandler(body);

    return res.status(201).json(alarmEventCreated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default createAlarmEventController;
