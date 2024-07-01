import updatePatientHpGroupHandler from "../../handlers/patient/updatePatientHpGroupHandler.js";


const updatePatientHpGroupController = async (req, res) => {
    try {
        const updateHpGroup = req.body;
        const hpGroup = await updatePatientHpGroupHandler(updateHpGroup);
        return res.status(200).json(hpGroup);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updatePatientHpGroupController;