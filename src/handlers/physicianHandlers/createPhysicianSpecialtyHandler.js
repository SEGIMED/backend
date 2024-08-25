import { PhysicianSpecialty } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const createPhysicianSpecialtyHandler = async (body) => {
  const { physicianId, medicalSpecialtyId } = body;
  try {
    const newSpecialty = await PhysicianSpecialty.create({
      physician: physicianId,
      medicalSpecialty: medicalSpecialtyId,
    });
    return newSpecialty;
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de creación.",
      500
    );
  }
};

export default createPhysicianSpecialtyHandler;
