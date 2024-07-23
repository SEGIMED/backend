import getAllAlarmsForPatientHandler from "../../handlers/alarmEvent/getAllAlarmsForPatientHandler.js";
import getAlarmByIdHandler from "../../handlers/alarmEvent/getAlarmByIdHandler.js";

const getAllAlarmsForPatientController = async (req, res) => {
  try {
    const { patientId } = req.params; // optional patientId
    const { alarmId } = req.query;

    if (alarmId) {
      const alarm = await getAlarmByIdHandler(alarmId);
      return res.status(200).json(alarm);
    } else if (patientId) {
      const allAlarmsForPatientId = await getAllAlarmsForPatientHandler(
        patientId
      );
      return res.status(200).json(allAlarmsForPatientId);
    } else {
      const allAlarmsForPatient = await getAllAlarmsForPatientHandler(
        patientId
      );
      return res.status(200).json(allAlarmsForPatient);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getAllAlarmsForPatientController;
