import models from "../../../../databaseConfig.js";

const getStudiesConsultationTabHandler = async ({ id }) => {
  try {
    const medicalEvent = await models.MedicalEvent.findByPk(id);

    const schedule = medicalEvent.scheduling;
    const studies = await models.PatientStudies.findAll({
      where: {
        schedule,
      },
      attributes: {
        exclude: ["userId", "id"],
      },
      include: {
        model: models.CatStudyType,
        as: "CatStudyType",
        attributes: ["name"],
      },
    });

    return studies;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al recuperar los archivos: " + error.message
    );
  }
};

export default getStudiesConsultationTabHandler;
