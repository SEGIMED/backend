import { AlarmEvent } from "../../databaseConfig.js";
import { mapquestionsPriority } from "../../mapper/alarmEvent/alarmEventMapper.js";
import {
  User,
  CatPulmonaryHypertensionGroup,
  PatientPulmonaryHypertensionGroup,
} from "../../databaseConfig.js";

const getAlarmByIdHandler = async (alarmId) => {
  try {
    const alarm = await AlarmEvent.findByPk(alarmId, {
      include: [
        {
          model: User,
          as: "AlarmForPatient",
          attributes: { exclude: ["password"] },
          // include: [
          //   {
          //     model: PatientPulmonaryHypertensionGroup,
          //     as: "userHpGroups",
          //     include: {
          //       model: CatPulmonaryHypertensionGroup,
          //       as: "catHpGroup",
          //       attributes: ["name"],
          //     },
          //   },
          // ],
        },
      ],
    });

    if (!alarm) {
      throw new Error("Alarma no encontrada");
    }

    return {
      id: alarm.id,
      patientName: alarm.AlarmForPatient.name,
      patientLastname: alarm.AlarmForPatient.lastname,
      createdAt: alarm.createdAt,
      ia_evaluation: alarm.ia_evaluation,
      ia_priority: alarm.ia_priority,
      ia_evaluation: alarm.ia_evaluation,
      chat_history: alarm.chat_history,
      alarm_description: alarm.alarmDescription,
      // htp_group: alarm.AlarmForPatient.userHpGroups.catHpGroup.name,
    };
  } catch (error) {
    throw new Error("Ha habido un error al cargar la alarma: " + error.message);
  }
};

export default getAlarmByIdHandler;
