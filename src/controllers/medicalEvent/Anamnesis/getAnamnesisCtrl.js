import getAnamnesisHandler from "../../../handlers/medicalEvent/Anamnesis/getAnamnesis.js";

const getAnamnesisCtrl = async (req, res) => {
  try {
    const { medicalEventId } = req.query;
    const response = await getAnamnesisHandler(medicalEventId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getAnamnesisCtrl;
