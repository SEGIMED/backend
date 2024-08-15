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
    // Verificar que el médico no esté registrado en el onboarding
    const physicianOnboarding = await models.PhysicianOnboarding.findOne({
      where: { idPhysician: userId },
    });
    if (physicianOnboarding) {
      throw new SegimedAPIError(
        400,
        "El médico ya está registrado en el onboarding"
      );
    }

    // verificamos que se mande un elemento dentro del array de centros de atención
    if (centerAttention.length === 0) {
      throw new SegimedAPIError(
        400,
        "Debe seleccionar al menos un centro de atención"
      );
    }

    // verificar si el médico ya está registrado en el centro de atención
    const verifyAttendentPlace = await centerAttention.forEach((element) => {
      const response = models.AttendentPlace.findOne({
        where: { idPhysician: userId, idCenterAttention: element },
      });
      if (response) {
        throw new SegimedAPIError(
          400,
          "El médico ya está registrado en el centro de atención"
        );
      }
    });

    // Crear un nuevo registro médico en el centro de atención
    const attendentPlaceRegister = await centerAttention.forEach(
      async (element) => {
        const newAttendentPlace = {
          idPhysician: userId,
          idCenterAttention: element,
        };
        await createRegisterPhysicianOnCenterAtt(newAttendentPlace);
      }
    );

    // Crear un nuevo registro médico en el onboarding del médico
    const [newOnbPhysician, createdOnb] =
      await models.PhysicianOnboarding.findOrCreate({
        where: { idPhysician: userId },
        defaults: {
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
