import { PatientMedicalBackground } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateMedicalBackgroundHandler = async (body) => {
  const { id } = body;

  try {
    const updatedBackground = await PatientMedicalBackground.update(
      {
        disease: body.diseaseId,
        backgroundType: body.backgroundType,
        description: body.description,
      },
      {
        where: {
          id: id,
        },
        returning: true,
        plain: true,
      }
    );
    return updatedBackground[1];
  } catch (error) {
    throw new SegimedAPIError("Hubo un error durante el proceso.", 500);
  }
};

export default updateMedicalBackgroundHandler;
