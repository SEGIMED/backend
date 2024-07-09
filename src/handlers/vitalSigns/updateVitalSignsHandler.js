import {VitalSignDetails} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateVitalSignsHandler = async (updateVitalSigns) => {

    try {
        const updatedVitalSigns = await Promise.all(updateVitalSigns.map(async (vitalSign) => {
            const [affectedCount, updatedVitalSign] = await VitalSignDetails.update(
                {
                    measure: vitalSign.measure
                },
                {
                    where: {
                        id: vitalSign.id
                    },
                    returning: true,
                    plain: true
                }
            );
            return updatedVitalSign; 
        }));
        return updatedVitalSigns;
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de actualización.', 500);
    }
    
};

export default updateVitalSignsHandler;