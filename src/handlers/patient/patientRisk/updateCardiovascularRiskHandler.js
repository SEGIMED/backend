import {PatientCardiovascularRisk} from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";


const updateCardiovascularRiskHandler = async (body) => {
    const {patientId} = body

    try {
        const updateCardiovascularRisk= await PatientCardiovascularRisk.update(
            {
                risk: body.riskId,
            },
            {
                where: {
                    patient: patientId
                },
                returning: true,
                plain: true
            }
        )
        return updateCardiovascularRisk[1]
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de actualización.', 500)
    }
};

export default updateCardiovascularRiskHandler;