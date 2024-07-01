import {MedicalProcedurePrescription} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";


const updateMedicalProcedurePrescriptionHandler = async (body) => {
    const {id} = body;

    try {
        const updatedProcedure = await MedicalProcedurePrescription.update(
            {
                medicalProcedure: body.medicalProcedureId,
            },
            {
                where: {
                    id: id
                },
                returning: true,
                plain: true
            }
        )
        return updatedProcedure[1]
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso.', 500)
    }
};

export default updateMedicalProcedurePrescriptionHandler;