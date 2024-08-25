import updateVitalSignsHandler from "../../handlers/medicalHistory/updateVitalSignsHandler.js";

const updateVitalSignsController = async (req, res) => {
  try {
    const updateVitalSigns = req.body;

    const vitalSign = await updateVitalSignsHandler(
      updateVitalSigns.vitalSignsToUpdate
    );
    return res.status(200).json(vitalSign);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default updateVitalSignsController;
