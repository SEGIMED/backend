import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

export const createOnbPhysician = async (body, userId) => {
  const convertUserid = parseInt(userId, 10);
  const {
    genre,
    birthDate,
    address,
    centerAttention,
    speciality,
    nacionalRegistration,
    provincialRegistration,
  } = body;
  try {
    const newOnbPhysician = await models.PhysicianOnboarding.create({
      idPhysician: convertUserid,
      genre,
      birthDate,
      address,
      centerAttention,
      speciality,
      nacionalRegistration,
      provincialRegistration,
    });
    return newOnbPhysician;
  } catch (error) {
    throw new SegimedAPIError(500, error.message);
  }
};
