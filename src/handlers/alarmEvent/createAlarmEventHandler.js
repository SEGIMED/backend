import { AlarmEvent } from "../../databaseConfig.js";
import { mapquestionsPriority } from "../../mapper/alarmEvent/alarmEventMapper.js";
const createAlarmEventHandler = async (body) => {
  try {
    let { patient, alarmDescription, questionsPriority } = body;

    questionsPriority = JSON.parse(questionsPriority);

    const alarmEvent = await AlarmEvent.create({
      patient,
      alarmDescription,
      questionsPriority,
    });

    alarmEvent.questionsPriority = await mapquestionsPriority(
      questionsPriority
    );
    return alarmEvent;
  } catch (error) {
    throw new Error("Ha habido un error al crear la alarma: " + error.message);
  }
};

export default createAlarmEventHandler;
