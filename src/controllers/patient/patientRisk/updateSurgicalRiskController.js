import updateSurgicalRiskHandler from "../../../handlers/patient/patientRisk/updateSurgicalRiskHandler.js";


const updateSurgicalRiskController = async (req, res) => {
    try {
        const updateSurgicalRisk = req.body;
        const risk = await updateSurgicalRiskHandler(updateSurgicalRisk);
        return res.status(200).json(risk);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updateSurgicalRiskController;