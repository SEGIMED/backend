import { AlarmEvent } from "../../databaseConfig.js";
import { mapquestionsPriority } from "../../mapper/alarmEvent/alarmEventMapper.js";
import { User, CatPulmonaryHypertensionGroup, PatientPulmonaryHypertensionGroup } from "../../databaseConfig.js";

const getAlarmByIdHandler = async (alarmId) => {
  try {
    const alarm = await AlarmEvent.findByPk(alarmId, {
      include: [
        {
          model: User,
          as: 'AlarmForPatient',
          attributes: { exclude: ['password'] },
          include: [{
            model: PatientPulmonaryHypertensionGroup,
            as: 'userHpGroups',
            include: {
              model: CatPulmonaryHypertensionGroup,
              as: 'catHpGroup',
              attributes: ['name']
            }
          }]
        }
      ]
    });

    if (!alarm) {
      throw new Error('Alarma no encontrada');
    }

    return {
      id: alarm.id,
      patient: alarm.patient,
      alarmDescription: alarm.alarmDescription,
      solved: alarm.solved,
      fecha: new Date(alarm.createdAt).toLocaleDateString(),
      hora: new Date(alarm.createdAt).toLocaleTimeString(),
      name: alarm.AlarmForPatient ? alarm.AlarmForPatient.name : null,
      lastname: alarm.AlarmForPatient ? alarm.AlarmForPatient.lastname : null,
      HTP: alarm.AlarmForPatient?.userHpGroups,
      questionsPriority: mapquestionsPriority(alarm.questionsPriority)
    };
  } catch (error) {
    throw new Error("Ha habido un error al cargar la alarma: " + error.message);
  }
};

export default getAlarmByIdHandler;
