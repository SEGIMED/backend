import getAllReviewsForPatientHandler from '../../../handlers/patient/reviewPatient/getAllReviewsForPatientHandler.js'

const getAllReviewsForPatientController=async(req,res)=>{
    try {
        const {patientId} = req.params
       
        const allReviewsForPatient = await getAllReviewsForPatientHandler(patientId)

        return res.status(200).json(allReviewsForPatient);
        
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default getAllReviewsForPatientController