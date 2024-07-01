import {AnthropometricDetails} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateAnthropometricDetailsHandler = async (body) => {
    const {id} = body

    try {
        const updatedAnthDetails = await AnthropometricDetails.update(
            {
                measure: body.measure,
                measureType: body.measureTypeId
            },
            {
                where: {
                    id: id
                },
                returning: true,
                plain: true
            }
        )
        return updatedAnthDetails[1]
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso.', 500)
    }
};

export default updateAnthropometricDetailsHandler;