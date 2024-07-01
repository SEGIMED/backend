import {TherapyPrescription} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateTherapyPrescriptionHandler = async (body) => {
    const {id} = body

    try {
        const updatedTherapy = await TherapyPrescription.update(
            {
                therapy: body.therapyId,
                description: body.description,
                quantity: body.quantity
            },
            {
                where: {
                    id: id
                },
                returning: true,
                plain: true
            }
        )
        return updatedTherapy[1]
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso.', 500)
    }
};

export default updateTherapyPrescriptionHandler;