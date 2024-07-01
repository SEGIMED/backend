import getAllReviewsMadeByPatientHandler from '../../../handlers/physicianHandlers/reviewPhysician/getAllReviewsMadeByPatientHandler.js'

const getAllReviewsMadeByPatientController=async(req,res)=>{
    try {
        const {patientId} = req.params
       
        const allReviewsForPatient = await getAllReviewsMadeByPatientHandler(patientId)

        return res.status(200).json(allReviewsForPatient);
        
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default getAllReviewsMadeByPatientController