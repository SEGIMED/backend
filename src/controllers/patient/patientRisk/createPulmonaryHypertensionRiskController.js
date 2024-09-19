import createPulmonaryHypertensionRiskHandler from "../../../handlers/patient/patientRisk/createPulmonaryHypertensionRiskHandler.js";

const createPulmonaryHypertensionRiskController = async (req, res) => {
  try {
    const { patientId, pulmonaryHypertensionRiskId } = req.body;
    const PulmonaryHypertensionRisk =
      await createPulmonaryHypertensionRiskHandler({
        patientId,
        pulmonaryHypertensionRiskId,
      });
    return res.status(200).json(PulmonaryHypertensionRisk);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default createPulmonaryHypertensionRiskController;
