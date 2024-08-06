import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

export const createOnbPhysician = async (body, userId) => {
  const convertUserid = parseInt(userId, 10);
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
      idPhysician: convertUserid,
      genre,
      birthDate,
      address,
      centerAttention,
      specialty,
      nacionalRegistration,
      provincialRegistration,
    });
    const [newSpecialty, created] =
      await models.PhysicianSpecialty.findOrCreate({
        where: { physician: convertUserid, medicalSpecialty: specialty },
      });

    const [newMedicalRegistryProvincial, createdProvincial] =
      await models.PhysicianMedicalRegistry.findOrCreate({
        where: {
          physician: convertUserid,
          registryType: 1,
          registryId: provincialRegistration,
        },
        defaults: { registryId: provincialRegistration },
      });

    const [newMedicalRegistryNacional, createdNacional] =
      await PhysicianMedicalRegistry.findOrCreate({
        where: {
          physician: convertUserid,
          registryType: 2,
          registryId: nacionalRegistration,
        },
        defaults: { registryId: nacionalRegistration },
      });

    return {
      newOnbPhysician,
      newMedicalRegistryNacional,
      newMedicalRegistryProvincial,
      newSpecialty,
    };
  } catch (error) {
    throw new SegimedAPIError(500, error.message);
  }
};
