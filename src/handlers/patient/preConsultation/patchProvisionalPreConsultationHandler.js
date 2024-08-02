import { ProvisionalPreConsultation } from "../../../databaseConfig.js";
import { updatePreconsultation } from "../../../validations/updatePreconsutation.js";

const patchProvisionalPreConsultationHandler = async(body,{transaction})=>{
    try {
        const existingPreconsultation = await ProvisionalPreConsultation.findOne({ where: { id: preconsultationId } });
        if (!existingPreconsultation) {
            throw new Error("No se encontró esta preconsulta");
        }
        const newData = await updatePreconsultation(body, existingPreconsultation); // se actualiza la preconsulta con los datos nuevos, si no hay datos nuevos se queda igual.
        const [updatedPreconsultation]  = await ProvisionalPreConsultation.update(newData,
        {where:{id:preconsultationId},
        returning:true,
        transaction})

        return updatedPreconsultation[0]
    } catch (error) {
        throw new Error("Error actualizando la preconsulta: " + error.message);
    }
}

export default patchProvisionalPreConsultationHandler