import createCardiovascularRiskHandler from "../../../handlers/patient/patientRisk/createCardiovascularRiskHandler.js";


const createCardiovascularRiskController = async (req, res) => {
    try {
        const cardiovascularRisk = await createCardiovascularRiskHandler(req.body);
        return res.status(200).json(cardiovascularRisk);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createCardiovascularRiskController;