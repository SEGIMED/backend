import { AlarmEvent } from "../../databaseConfig.js";
import { mapquestionsPriority } from "../../mapper/alarmEvent/alarmEventMapper.js";
const regexPositiveNumbers = /^[1-9][0-9]*$/;

const patchAlarmEventHandler = async (id, update) => {
  try {
    if (!regexPositiveNumbers.test(id)) {
      throw new Error("El id de la alarma debe ser un entero positivo");
    }
    const alarmEventToUpdate = await AlarmEvent.findOne({ where: { id } });
    if (!alarmEventToUpdate) {
      throw new Error('Alarma con ID " + id + " no encontrada');
    }
    alarmEventToUpdate.update(update);
    const alarmEventUpdated = await alarmEventToUpdate.save();
    return {
      id: alarmEventUpdated.id,
      patient: alarmEventUpdated.patient,
      alarmDescription: alarmEventUpdated.alarmDescription,
      questionsPriority: mapquestionsPriority(
        alarmEventUpdated.questionsPriority
      ),
    };
  } catch (error) {
    throw new SegimedAPIError("Hubo un error durante el proceso.", 500);
  }
};

export default patchAlarmEventHandler;
