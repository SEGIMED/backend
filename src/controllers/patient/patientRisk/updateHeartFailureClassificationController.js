import updateHeartFailureClassificationHandler
    from "../../../handlers/patient/patientRisk/updateHeartFailureClassificationHandler.js";


const updateHeartFailureClassificationController = async (req, res) => {
    try {
        const updateNyhaClassification = req.body;
        const nyha = await updateHeartFailureClassificationHandler(updateNyhaClassification);
        return res.status(200).json(nyha);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updateHeartFailureClassificationController;