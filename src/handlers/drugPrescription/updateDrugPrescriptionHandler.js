import {DrugPrescription} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateDrugPrescriptionHandler = async (body) => {
    const {id} = body

    try {
        const updateDrugPrescription = await DrugPrescription.update(
            {
                drug : body.drugId,
                prescribedDose: body.prescribedDose,
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
        return updateDrugPrescription[1]
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso.', 500)
    }
};

export default updateDrugPrescriptionHandler;