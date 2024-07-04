import getAllAlarmsForPatientHandler from "../../handlers/alarmEvent/getAllAlarmsForPatientHandler.js";
import getAlarmByIdHandler from "../../handlers/alarmEvent/getAlarmByIdHandler.js";

const getAllAlarmsForPatientController = async (req, res) => {
  try {
    const { patientId } = req.params;  // optional patientId
    const { alarmId } = req.query;

    if (alarmId) {
      const alarm = await getAlarmByIdHandler(alarmId);
      return res.status(200).json(alarm);
    } else if (patientId) {
      const allAlarmsForPatient = await getAllAlarmsForPatientHandler(patientId);
      return res.status(200).json(allAlarmsForPatient);
    } else {
      return res.status(400).json({ error: "Debe proporcionar un patientId o un alarmId" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getAllAlarmsForPatientController;
