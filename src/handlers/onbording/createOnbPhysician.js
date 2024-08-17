import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import { PhysicianSpecialty } from "../../databaseConfig.js";
import { PhysicianMedicalRegistry } from "../../databaseConfig.js";
import contextService from "request-context";
import { createRegisterPhysicianOnCenterAtt } from "./registerPhysicianOnCenterAtt.js";

export const createOnbPhysician = async (body) => {
  const userId = contextService.get("request:user").userId;
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
    // verificamos que se mande un elemento dentro del array de centros de atención
    if (centerAttention.length === 0) {
      throw new SegimedAPIError(
        400,
        "Debe seleccionar al menos un centro de atención"
      );
    }

    // Crear un nuevo registro médico en el centro de atención
    const attendentPlaceRegister = centerAttention.map((centerid) => {
      return {
        idPhysician: userId,
        idCenterAttention: centerid,
      };
    });
    await createRegisterPhysicianOnCenterAtt(attendentPlaceRegister);

    // Crear un nuevo registro médico en el onboarding del médico
    const [newOnbPhysician, createPhysician] =
      await models.PhysicianOnboarding.findOrCreate({
        where: { idPhysician: userId },
        defaults: {
          idPhysician: userId,
          genre,
          birthDate,
          address,
        },
      });

    // Crear un nuevo registro médico en la especialidad del médico
    const [newSpecialty, created] = await PhysicianSpecialty.findOrCreate({
      where: { physician: userId, medicalSpecialty: specialty },
    });

    // Crear un nuevo registro médico provincial
    const [newMedicalRegistryProvincial, createdProvincial] =
      await PhysicianMedicalRegistry.findOrCreate({
        where: {
          physician: userId,
          registryType: 1,
          registryId: provincialRegistration,
        },
        defaults: { registryId: provincialRegistration },
      });

    // Crear un nuevo registro médico nacional
    const [newMedicalRegistryNacional, createdNacional] =
      await PhysicianMedicalRegistry.findOrCreate({
        where: {
          physician: userId,
          registryType: 2,
          registryId: nacionalRegistration,
        },
        defaults: { registryId: nacionalRegistration },
      });

    return {
      newOnbPhysician: createPhysician
        ? newOnbPhysician
        : "Ya existe un registro de onboarding para este médico",
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
