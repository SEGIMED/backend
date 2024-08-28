import { Backgrounds } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateBackgroundsHandler = async (id, body) => {
  if (!id) {
    throw new SegimedAPIError("El id es requerido.", 400);
  }
  const {
    surgicalBackground,
    pathologicBackground,
    nonPathologicBackground,
    familyBackground,
    pediatricBackground,
    pharmacologicalBackground,
    vaccinationBackground,
    allergicBackground,
    timestamp,
    medicalEvent,
    appointmentScheduling,
    patient,
  } = body;

  try {
    const updatedBackground = await Backgrounds.update(
      {
        surgicalBackground,
        pathologicBackground,
        nonPathologicBackground,
        familyBackground,
        pediatricBackground,
        pharmacologicalBackground,
        vaccinationBackground,
        allergicBackground,
        timestamp,
        medicalEvent,
        appointmentScheduling,
        patient,
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

export default updateBackgroundsHandler;
