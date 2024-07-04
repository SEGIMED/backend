import {VitalSignDetails} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateVitalSignsHandler = async (body) => {
    const {id} = body

    try {
        const vitalSign = await VitalSignDetails.update(
            {
                measure: body.measure
            },
            {
                where: {
                    id: id
                },
                returning: true,
                plain: true
            }
        )
        return vitalSign[1]
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de actualización.', 500)
    }
};

export default updateVitalSignsHandler;