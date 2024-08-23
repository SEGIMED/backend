import getAnamnesisHandler from "../../../handlers/medicalHistory/Anamnesis/getAnamnesis.js";

const getAnamnesisCtrl = async (req, res) => {
  try {
    const { userId, page, limit } = req.query;
    const response = await getAnamnesisHandler(userId, page, limit);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getAnamnesisCtrl;
