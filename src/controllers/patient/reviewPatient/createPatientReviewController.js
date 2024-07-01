import createPatientReviewHandler from "../../../handlers/patient/reviewPatient/createPatientReviewHandler.js";

const createPatientReviewController = async (req, res) =>{
    try {
        const {patientId} = req.params
        const body = req.body;
    
        const reviewCreated = await createPatientReviewHandler(patientId, body);

        return res.status(201).json(reviewCreated);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createPatientReviewController;