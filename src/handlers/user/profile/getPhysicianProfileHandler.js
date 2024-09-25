import models from "../../../databaseConfig.js";

const getPhysicianProfileHandler = async ({ id, role }) => {
  try {
    const user = await models.User.findByPk(id, {
      attributes: {
        exclude: [
          "idType",
          "password",
          "role",
          "verified",
          "nacionality",
          "currentLocation",
        ],
      },
      include: [
        {
          model: models.PhysicianOnboarding,
          include: [
            {
              model: models.CatGenre,
            },
            {
              model: models.CatCenterAttention,
            },
          ],
        },
        {
          model: models.PhysicianSpecialty,
          as: "physicianSpecialties",
          attributes: ["medicalSpecialty"],
          include: {
            model: models.CatMedicalSpecialty,
            as: "specialty",
            attributes: ["name"],
          },
        },
        {
          model: models.PhysicianMedicalRegistry,
          as: "physicianMedicalRegistries",
          attributes: ["registryId", "registryType"],
          include: {
            model: models.CatMedicalRegistrationType,
            as: "medicalRegistrationType",
            attributes: ["name"],
          },
        },
        {
          model: models.PhysicianFiles,
          as: "files",
          include: {
            model: models.CatFileType,
          },
        },
      ],
    });
    return user;
  } catch (error) {
    throw new Error(
      "Ocurrió un error al recuperar los datos del paciente: " + error.message
    );
  }
};
export default getPhysicianProfileHandler;
