import createScheduleHandler from "../../handlers/managementSchedule/createAttentionHandler.js";

const createSchedule = async (req, res) => {
  const { idUser } = req.params;
  const { openAtt, closeAtt } = req.body;
  try {
    await createScheduleHandler(idUser, openAtt, closeAtt);
    res.status(200).json({ message: "Registro con exito" });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.error(error.message);
  }
};

export default createSchedule;
