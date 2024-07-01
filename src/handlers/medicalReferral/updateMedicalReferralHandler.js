import {MedicalReferral} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateMedicalReferralHandler = async (body) => {
    const {id} = body

    try {
        const updatedReferral = await MedicalReferral.update(
            {
                specialty: body.physicianSpecialtyId,
                description: body.description,
            },
            {
                where: {
                    id: id
                },
                returning: true,
                plain: true
            }
        )
        return updatedReferral[1]
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso.', 500)
    }
};

export default updateMedicalReferralHandler;