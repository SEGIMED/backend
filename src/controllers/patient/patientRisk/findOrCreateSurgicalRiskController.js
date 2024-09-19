import findOrCreateSurgicalRiskHandler from "../../../handlers/patient/patientRisk/findOrCreateSurgicalRiskHandler.js";

const findOrCreateSurgicalRiskController = async (req, res) => {
  try {
    const { patientId, surgicalRiskId } = req.body;
    const surgicalRisk = await findOrCreateSurgicalRiskHandler({
      patientId,
      surgicalRiskId,
    });
    return res.status(200).json(surgicalRisk);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default findOrCreateSurgicalRiskController;
