import getAllReviewsForPhisicianHandler  from "../../../handlers/physicianHandlers/reviewPhysician/getAllReviewsForPhysicianHandler.js"

const getAllReviewsForPhisicianController = async(req,res)=>{
    try {
        const {physicianId} = req.params
       
        const allReviewsForPhysician = await getAllReviewsForPhisicianHandler(physicianId)

        return res.status(200).json(allReviewsForPhysician);
        
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default getAllReviewsForPhisicianController;