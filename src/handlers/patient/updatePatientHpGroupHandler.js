import {PatientPulmonaryHypertensionGroup} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";


const updatePatientHpGroupHandler = async (body) => {
    const {patientId} = body

    try {
        const updateHpGroup = await PatientPulmonaryHypertensionGroup.update(
            {
                group: body.hpGroupId
            },
            {
                where: {
                    patient: patientId
                },
                returning: true,
                plain: true
            }
        )
        return updateHpGroup[1]
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de actualización.', 500)
    }
};

export default updatePatientHpGroupHandler;