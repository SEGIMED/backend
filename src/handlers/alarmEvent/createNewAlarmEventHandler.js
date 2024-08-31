import { AlarmEvent } from "../../databaseConfig.js";
const createNewAlarmEventHandler = async (body) => {
  try {
    let {
      patient,
      alarmDescription,
      ia_priority,
      ia_evaluation,
      chat_history,
    } = body;

    const alarmEvent = await AlarmEvent.create({
      patient,
      chat_history,
      alarmDescription,
      ia_priority,
      ia_evaluation,
    });

    return alarmEvent;
  } catch (error) {
    throw new Error("Ha habido un error al crear la alarma: " + error.message);
  }
};

export default createNewAlarmEventHandler;
