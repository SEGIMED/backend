import { AlarmEvent } from "../../databaseConfig.js";
import { mapquestionsPriority } from "../../mapper/alarmEvent/alarmEventMapper.js";
import {
  User,
} from "../../databaseConfig.js";

const getAllAlarmsForPatientHandler = async (patientId) => {
  try {
    let allAlarmsForPatient;
    if (patientId) {
      allAlarmsForPatient = await AlarmEvent.findAll({
        where: {
          patient: patientId,
        },
        include: [
          {
            model: User,
            as: "AlarmForPatient",
            attributes: { exclude: ["password"] },
          },
        ],
      });
    } else {
      allAlarmsForPatient = await AlarmEvent.findAll({
        include: [
          {
            model: User,
            as: "AlarmForPatient",
            attributes: { exclude: ["password"] },
          },
        ],
      });
    }
    return allAlarmsForPatient.map((alarm) => {
      return {
        patient: {
          id: alarm.AlarmForPatient.id,
          name: alarm.AlarmForPatient.name,
          lastname: alarm.AlarmForPatient.lastname,
          avatar: alarm.AlarmForPatient.avatar,
        },
        id: alarm.id,
        createdAt: alarm.createdAt,
        ia_evaluation: alarm.ia_evaluation,
        ia_priority: alarm.ia_priority,
        ia_evaluation: alarm.ia_evaluation,
        chat_history: alarm.chat_history,
        alarm_description: alarm.alarmDescription,
        // htp_group:'',
        solved: alarm.solved,
      };
    });
  } catch (error) {
    throw new Error(
      "Ha habido un error al cargar las alarmas: " + error.message
    );
  }
};

export default getAllAlarmsForPatientHandler;
