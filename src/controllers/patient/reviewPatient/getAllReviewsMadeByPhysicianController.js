import getAllReviewsMadeByPhysicianHandler from "../../../handlers/patient/reviewPatient/getAllReviewsMadeByPhysicianHandler.js";
const getAllReviewsMadeByPhysicianController=async(req,res)=>{
    try {
        const {physicianId} = req.params
       
        const allReviewsForPhysician = await getAllReviewsMadeByPhysicianHandler(physicianId)

        return res.status(200).json(allReviewsForPhysician);
        
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default getAllReviewsMadeByPhysicianController