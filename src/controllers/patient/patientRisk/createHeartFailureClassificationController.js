import createHeartFailureClassificationHandler
    from "../../../handlers/patient/patientRisk/createHeartFailureClassificationHandler.js";

const createHeartFailureClassificationController = async (req, res) => {
    try {
        const newClassification = await createHeartFailureClassificationHandler(req.body);
        return res.status(200).json(newClassification);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createHeartFailureClassificationController;