import getAllAlarmsForPatientHandler from "../../handlers/alarmEvent/getAllAlarmsForPatientHandler.js";

const getAllAlarmsForPatientController = async (req, res) => {
  try {
    const {patientId} = req.params;

    const allAlarmsForPatient = await getAllAlarmsForPatientHandler(patientId);
    
    return res.status(200).json(allAlarmsForPatient);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getAllAlarmsForPatientController;
