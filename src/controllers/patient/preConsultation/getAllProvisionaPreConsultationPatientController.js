import getAllProvisionaPreConsultationHandler from "../../../handlers/patient/preConsultation/getAllProvisionaPreConsultationPatientHandler.js"

const getAllProvisionaPreConsultationPatientController = async(req,res)=>{
    try {
        const{patientId}=req.body
        const allConsultationsPatient = await getAllProvisionaPreConsultationHandler(patientId)
        return res.status(200).json(allConsultationsPatient);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export default getAllProvisionaPreConsultationPatientController