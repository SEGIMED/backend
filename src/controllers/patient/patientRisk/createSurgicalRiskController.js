import createSurgicalRiskHandler from "../../../handlers/patient/patientRisk/createSurgicalRiskHandler.js";


const createSurgicalRiskController = async (req, res) => {
    try {
        const surgicalRisk = await createSurgicalRiskHandler(req.body);
        return res.status(200).json(surgicalRisk);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createSurgicalRiskController;