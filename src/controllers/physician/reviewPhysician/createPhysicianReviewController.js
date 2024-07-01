import createPhysicianReviewHandler from "../../../handlers/physicianHandlers/reviewPhysician/createPhysicianReviewHandler.js";

const createPhysicianReviewController = async (req, res) =>{
    try {
        const {physicianId} = req.params
        const body = req.body;

        const reviewCreated = await createPhysicianReviewHandler(physicianId, body);

        return res.status(201).json(reviewCreated);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createPhysicianReviewController;