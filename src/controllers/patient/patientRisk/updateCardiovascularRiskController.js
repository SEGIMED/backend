import updateCardiovascularRiskHandler from "../../../handlers/patient/patientRisk/updateCardiovascularRiskHandler.js";


const updateCardiovascularRiskController = async (req, res) => {
    try {
        const updateCardiovascularRisk = req.body;
        const risk = await updateCardiovascularRiskHandler(updateCardiovascularRisk);
        return res.status(200).json(risk);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updateCardiovascularRiskController;