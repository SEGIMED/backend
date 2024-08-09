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
    const newOnbPhysician = await models.PhysicianOnboarding.create({
      idPhysician: convertUserid,
      genre,
      birthDate,
      address,
    });

    const cent_att = await models.CatCenterAttention.findByPk(centerAttention);
    console.log(cent_att);

    const physician = await models.User.findByPk(convertUserid);

    if (!cent_att) {
      throw new SegimedAPIError(404, "Centro de atención no encontrado");
    }

    const [newAttendentPlace, createdPlace] = await AttendentPlace.findOrCreate(
      {
        where: {
          idPhysician: convertUserid,
          idCenterAttention: centerAttention,
        },
      }
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
      newAttendentPlace,
    };
  } catch (error) {
    console.log(error);

    throw new SegimedAPIError(500, error.message);
  }
};
