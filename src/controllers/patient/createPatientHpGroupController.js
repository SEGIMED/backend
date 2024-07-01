import createPatientHpGroupHandler from "../../handlers/patient/createPatientHpGroupHandler.js";


const createHpGroupController = async (req, res) => {
    try {
        const hpGroup = await createPatientHpGroupHandler(req.body);
        return res.status(200).json(hpGroup);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createHpGroupController;