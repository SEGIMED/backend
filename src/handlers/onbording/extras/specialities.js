import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

export const syncPhysicianSpecialties = async ({ userId, specialties }) => {
  try {
    const existingSpecialties = await models.PhysicianSpecialty.findAll({
      where: { physician: userId },
      attributes: ["medicalSpecialty"],
    });

    const existingSpecialtyIds = existingSpecialties.map(
      (specialty) => specialty.medicalSpecialty
    );

    const specialtiesToAdd = specialties.filter(
      (specialtyId) => !existingSpecialtyIds.includes(specialtyId)
    );

    const specialtiesToRemove = existingSpecialtyIds.filter(
      (specialtyId) => !specialties.includes(specialtyId)
    );

    if (specialtiesToRemove.length > 0) {
      await models.PhysicianSpecialty.destroy({
        where: {
          physician: userId,
          medicalSpecialty: specialtiesToRemove,
        },
      });
    }

    if (specialtiesToAdd.length > 0) {
      const specialtiesData = specialtiesToAdd.map((specialtyId) => ({
        physician: userId,
        medicalSpecialty: specialtyId,
      }));

      await models.PhysicianSpecialty.bulkCreate(specialtiesData);
    }
    const newSpecialties = await models.PhysicianSpecialty.findAll({
      where: { physician: userId },
      attributes: ["medicalSpecialty"],
      include:{
        model: models.CatMedicalSpecialty,
        as: "specialty"
      }
    });

    return newSpecialties;
  } catch (error) {
    throw new SegimedAPIError(
      500,
      error.message || "Error al sincronizar las especialidades médicas"
    );
  }
};
