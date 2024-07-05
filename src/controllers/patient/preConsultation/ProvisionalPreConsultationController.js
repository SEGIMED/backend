import SegimedAPIError from "../../../error/SegimedAPIError.js";
import createPreConsultationHandler from "../../../handlers/patient/preConsultation/ProvisionalPreConsultationHandler.js"
import createVitalSignsHandler from "../../../handlers/vitalSigns/createVitalSignsHandler.js"
import createPatientPainMapHandler from "../../../handlers/painMap/createPatientPainMapHandler.js"

const createPreConsultationController = async (req,res) =>{
    try {

        const preConsultation = await createPreConsultationHandler(req.body)
        const vitalSigns = await createVitalSignsHandler(req.body.vitalSignsToCreate)//It receives an array of vital signs
        const physicalExamination= await createPatientPainMapHandler(req.body.painRecordsToCreate[0])
        return res.status(200).json({preConsultation,vitalSigns, physicalExamination});
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de creación',error, 500) 
    }
}

export default createPreConsultationController