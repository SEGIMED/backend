import getScheduleByIdHandler from "../../handlers/managementSchedule/getScheduleByIdHandler.js";

const getScheduleById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getScheduleByIdHandler(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).json({ msj: error.message });
  }
};
export default getScheduleById;
