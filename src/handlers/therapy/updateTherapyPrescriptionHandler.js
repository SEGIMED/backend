import { TherapyPrescription } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateTherapyPrescriptionHandler = async (body) => {
  const { id, medicalEventId, therapyDescription, quantity } = body;

  try {
    // Verificar si se proporciona id o medicalEventId
    if (!id && !medicalEventId) {
      throw new SegimedAPIError("datos insuficientes.", 400);
    }

    // Verificar si existe una entrada con el id o medicalEventId proporcionado
    const existingTherapy = await TherapyPrescription.findOne({
      where: id ? { id } : { medicalEvent: medicalEventId },
    });

    if (!existingTherapy) {
      throw new SegimedAPIError(
        "No se encontró la prescripción que intenta actualizar.",
        404
      );
    }

    // Realizar la actualizacion
    const updatedTherapy = await TherapyPrescription.update(
      {
        therapyDescription,
        quantity,
      },
      {
        where: id ? { id } : { medicalEvent: medicalEventId },
        returning: true,
        plain: true,
      }
    );

    return updatedTherapy[1];
  } catch (error) {
    if (error instanceof SegimedAPIError) {
      throw error;
    }
    throw new SegimedAPIError("Hubo un error durante el proceso.", 500);
  }
};

export default updateTherapyPrescriptionHandler;
