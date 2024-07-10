import segimedAPIError from "../../../error/SegimedAPIError.js";
import { AppointmentScheduling, PatientPainMap, ProvisionalPreConsultation, VitalSignDetails } from "../../../databaseConfig.js"

const getAllProvisionaPreConsultationHandler = async(patientId)=>{

    try {
        
        const allPreConsultations = await ProvisionalPreConsultation.findAll(
            {
                where:{
                   patient:patientId 
                },
                include:[
                    // {
                    //     model:PatientPainMap,
                    //     as:'provisionalPreConsultationPainMap'
                    // },
                    {
                        model:AppointmentScheduling,
                        as:'ProvisionalPreConsultationSchedule',

                        include:[
                            {
                                model:VitalSignDetails,
                                as:'vitalSignDetailsScheduling'
                            }
                        ]
                    }
                ]
            }
        )

        return allPreConsultations
    } catch (error) {
        throw new segimedAPIError("Error al cargar los detalles de la preconsulta ", 500);
    }
}

export default getAllProvisionaPreConsultationHandler