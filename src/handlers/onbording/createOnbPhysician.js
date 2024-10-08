import models from "../../databaseConfig.js";
import { PhysicianMedicalRegistry } from "../../databaseConfig.js";
import { syncPhysicianSpecialties } from "./extras/specialities.js";
import { syncRegisterPhysicianOnCenterAtt } from "./registerPhysicianOnCenterAtt.js";

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
    // verificamos que se mande un elemento dentro del array de centros de atención
    if (centerAttention.length === 0) {
      throw new Error("Debe seleccionar al menos un centro de atención");
    }

    // Crear un nuevo registro médico en el centro de atención
    const attendentPlaceRegister = centerAttention.map((centerid) => {
      return {
        idPhysician: userId,
        idCenterAttention: centerid,
      };
    });
    const allAttendentPlace = await syncRegisterPhysicianOnCenterAtt(
      attendentPlaceRegister
    );

    const [newOnbPhysician, created] =
      await models.PhysicianOnboarding.findOrCreate({
        where: { idPhysician: userId },
        defaults: {
          idPhysician: userId,
          genre,
          birthDate,
          address,
        },
      });
    if (!created) {
      await newOnbPhysician.update({
        genre,
        birthDate,
        address,
      });
    }

    const newSpecialty = await syncPhysicianSpecialties({
      userId,
      specialties: specialty,
    });

    const [medicalRegistryProvincial, createdRP] =
      await PhysicianMedicalRegistry.findOrCreate({
        where: {
          physician: userId,
          registryType: 1,
        },
        defaults: { registryId: provincialRegistration },
      });

    if (!createdRP) {
      await medicalRegistryProvincial.update({
        registryId: provincialRegistration,
      });
    }

    const [medicalRegistryNacional, createdRN] =
      await PhysicianMedicalRegistry.findOrCreate({
        where: {
          physician: userId,
          registryType: 2,
        },
        defaults: { registryId: nacionalRegistration },
      });

    if (!createdRN) {
      await medicalRegistryNacional.update({
        registryId: nacionalRegistration,
      });
    }

    return {
      newOnbPhysician,
      medicalRegistryNacional,
      medicalRegistryProvincial,
      newSpecialty,
      allAttendentPlace,
    };
  } catch (error) {
    throw new Error(
      "Ocurrió un error al guardar los datos del médico: " + error.message
    );
  }
};
