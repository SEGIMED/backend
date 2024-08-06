import createSchedulingHandler from "../../handlers/scheduling/createSchedulingHandler.js";

const createSchedulingController = async (req, res) => {
  try {
    const newPatientScheduling = await createSchedulingHandler(req.body);
    return res.status(201).json({
      msg: "Se agendó la cita correctamente",
      patientScheduling: newPatientScheduling,
    });
  } catch (error) {
    return res.status(error.errorCode).json({ error: error.message });
  }
};

export default createSchedulingController;
