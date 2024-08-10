import models, { AttendentPlace } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import { PhysicianSpecialty } from "../../databaseConfig.js";
import { PhysicianMedicalRegistry } from "../../databaseConfig.js";
import { where } from "sequelize";

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
    const [newOnbPhysician, createdOnb] =
      await models.PhysicianOnboarding.findOrCreate({
        where: { idPhysician: convertUserid },
        defaults: {
          genre,
          birthDate,
          address,
        },
      });

    const centerAttentionArray = Array.isArray(centerAttention)
      ? centerAttention
      : [centerAttention];

    const attendentPlaceRegister = await Promise.all(
      centerAttention.map(async (element) => {
        const [newAttendentPlace, createdPlace] =
          await AttendentPlace.findOrCreate({
            where: {
              idPhysician: convertUserid,
              idCenterAttention: element,
            },
          });
        return newAttendentPlace;
      })
    );

    const [newSpecialty, created] = await PhysicianSpecialty.findOrCreate({
      where: { physician: convertUserid, medicalSpecialty: specialty },
    });

    const [newMedicalRegistryProvincial, createdProvincial] =
      await PhysicianMedicalRegistry.findOrCreate({
        where: {
          physician: convertUserid,
          registryType: 1,
          registryId: provincialRegistration,
        },
        defaults: { registryId: provincialRegistration },
      });

    // Crear un nuevo registro médico nacional
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
      attendentPlaceRegister,
    };
  } catch (error) {
    console.log(error);

    throw new SegimedAPIError(500, error.message);
  }
};
