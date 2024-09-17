import models from "../../../../databaseConfig.js";

const getPhysicalExaminarionTabHandler = async ({ id }) => {
  try {
    const physicalExamination = await models.PatientPhysicalExamination.findAll(
      {
        where: { medicalEvent: id },
        attributes: ["description"],
        include: {
          model: models.CatPhysicalSubsystem,
          as: "catPhysicalSubsystem",
          attributes: ["name"],
        },
      }
    );
    return physicalExamination
  } catch (error) {
    throw new Error(
      "Ocurrió un error al recuperar los examenes físicos: " + error.message
    );
  }
};
export default getPhysicalExaminarionTabHandler;
