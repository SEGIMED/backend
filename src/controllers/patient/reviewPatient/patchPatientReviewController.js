import patchPatientReviewHandler from "../../../handlers/patient/reviewPatient/patchPatientReviewHandler.js"

const patchPatientReviewController= async (req, res)=>{
    try {
        const {id} = req.params
        const update= req.body
        const patientReviewUpdated = await patchPatientReviewHandler(id,update)
        return res.status(200).json(patientReviewUpdated)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default patchPatientReviewController