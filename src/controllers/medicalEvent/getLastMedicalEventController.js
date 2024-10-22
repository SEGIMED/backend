import getLastMedicalEventHandler from "../../handlers/medicalEvent/getLastMedicalEventHandler.js";

const getLastMedicalEventController = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await getLastMedicalEventHandler({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export default getLastMedicalEventController;
