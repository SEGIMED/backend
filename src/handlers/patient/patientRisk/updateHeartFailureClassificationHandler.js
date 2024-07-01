import {PatientHeartFailureClassification} from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";


const updateHeartFailureClassificationHandler = async (body) => {
    const {patientId} = body

    try {
        const updateNyhaClassification = await PatientHeartFailureClassification.update(
            {
                heartFailureClassification: body.heartFailureClassificationId
            },
            {
                where: {
                    patient: patientId
                },
                returning: true,
                plain: true
            }
        )
        return updateNyhaClassification[1]
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de actualización.', 500)
    }
};

export default updateHeartFailureClassificationHandler;