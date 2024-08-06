import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import { PhysicianSpecialty } from "../../databaseConfig.js";
import { PhysicianMedicalRegistry } from "../../databaseConfig.js";

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
    });

    const [newSpecialty, created] = await PhysicianSpecialty.findOrCreate({
      where: { physician: convertUserid, medicalSpecialty: specialty },

    });

    const [newMedicalRegistryProvincial, createdProvincial] = await PhysicianMedicalRegistry.findOrCreate({
      where: { physician: convertUserid, registryType: 1, registryId: provincialRegistration },
      defaults: { registryId: provincialRegistration }
    });

    // Crear un nuevo registro médico nacional
    const [newMedicalRegistryNacional, createdNacional] = await PhysicianMedicalRegistry.findOrCreate({
      where: { physician: convertUserid, registryType: 2, registryId: nacionalRegistration },
      defaults: { registryId: nacionalRegistration }
    });



    return { newOnbPhysician, newMedicalRegistryNacional, newMedicalRegistryProvincial, newSpecialty };
  } catch (error) {
    console.log(error);

    throw new SegimedAPIError(500, error.message);
  }
};
