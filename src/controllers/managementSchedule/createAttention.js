import createScheduleHandler from "../../handlers/managementSchedule/createAttentionHandler.js";

const createSchedule = async (req, res) => {
  const { idUser } = req.query;
  const { openAtt, closeAtt } = req.body;
  try {
    await createScheduleHandler(idUser, openAtt, closeAtt);
    return res.status(200).json({ message: "Registro con exito" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export default createSchedule;
