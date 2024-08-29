import createVitalSignsHandler from "../../handlers/medicalHistory/createVitalSignsHandler.js";

const createVitalSignsController = async (req, res) => {
  try {
    const newVitalSign = req.body;

    const vitalSing = await createVitalSignsHandler(newVitalSign);
    return res.status(200).json(vitalSing);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default createVitalSignsController;
