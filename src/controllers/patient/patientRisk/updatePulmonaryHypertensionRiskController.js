import updateHpRiskHandler from "../../../handlers/patient/patientRisk/updatePulmonaryHypertensionRiskHandler.js";


const updateHpRiskController = async (req, res) => {
    try {
        const updateHpRisk = req.body;
        const risk = await updateHpRiskHandler(updateHpRisk);
        return res.status(200).json(risk);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updateHpRiskController;