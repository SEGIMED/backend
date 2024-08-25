import { PhysicianMedicalRegistry } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const createPhysicianMedicalRegisterHandler = async (body) => {
  const { physicianId, registryId, registryType } = body;
  try {
    const newMedicalRegistry = await PhysicianMedicalRegistry.create({
      physician: physicianId,
      registryId,
      registryType,
    });
    return newMedicalRegistry;
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de creación.",
      500
    );
  }
};

export default createPhysicianMedicalRegisterHandler;
