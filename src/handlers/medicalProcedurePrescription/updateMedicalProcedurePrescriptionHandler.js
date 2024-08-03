import { MedicalProcedurePrescription } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateMedicalProcedurePrescriptionHandler = async (body) => {
  const { id, medicalEventId, medicalProcedureId, medicalProcedureName } = body;

  try {
    // Verificar si se proporciona id o medicalEventId
    if (!id && !medicalEventId) {
      throw new SegimedAPIError(
        "Se debe proporcionar id o medicalEventId.",
        400
      );
    }

    // Verificar si existe una entrada con el id o medicalEventId proporcionado
    const existingProcedure = await MedicalProcedurePrescription.findOne({
      where: id ? { id } : { medicalEvent: medicalEventId },
    });

    if (!existingProcedure) {
      throw new SegimedAPIError(
        "No se encontró una prescripción con el id o medicalEventId proporcionado.",
        404
      );
    }

    // Realizar la actualización basada en el campo proporcionado
    const updatedProcedure = await MedicalProcedurePrescription.update(
      {
        medicalProcedure: medicalProcedureId,
        medicalProcedureName,
      },
      {
        where: id ? { id } : { medicalEvent: medicalEventId },
        returning: true,
        plain: true,
      }
    );

    return updatedProcedure[1];
  } catch (error) {
    if (error instanceof SegimedAPIError) {
      throw error;
    }
    throw new SegimedAPIError("Hubo un error durante el proceso.", 500);
  }
};

export default updateMedicalProcedurePrescriptionHandler;
