import getVitalSignsByMedicalEventHandler from "../../handlers/vitalSigns/getVitalSignsByMedicalEventHandler.js";

const getVitalSignsByMedicalEventController = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await getVitalSignsByMedicalEventHandler({ id });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export default getVitalSignsByMedicalEventController;
