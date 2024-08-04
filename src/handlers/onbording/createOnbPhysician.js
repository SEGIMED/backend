import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

export const createOnbPhysician = async (body, userId) => {
  const {
    genre,
    birthDate,
    address,
    centerAttention,
    specialty,
    nacionalRegistration,
    provincialRegistration,
  } = body;
  try {
    const newOnbPhysician = await models.PhysicianOnboarding.create({
      userId,
      genre,
      birthDate,
      address,
      centerAttention,
      specialty,
      nacionalRegistration,
      provincialRegistration,
    });
    return newOnbPhysician;
  } catch (error) {
    throw new SegimedAPIError(500, error.message);
  }
};
