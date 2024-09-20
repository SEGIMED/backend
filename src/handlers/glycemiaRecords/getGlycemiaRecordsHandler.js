import models from "../../databaseConfig.js";

const getGlycemiaRecordsHandler = async ({
  medicalEvent,
  selfEvaluationEvent,
}) => {
  try {
    const glycemia = await models.GlycemiaRecords.findAll({
      where: {
        medicalEvent: medicalEvent ?? null,
        selfEvaluationEvent: selfEvaluationEvent ?? null,
      },
      attributes: ["value"],
    });

    return glycemia;
  } catch (error) {
    throw new Error(
      "Ocurrió un error al recuperar los datos de glucemia: " + error.message
    );
  }
};
export default getGlycemiaRecordsHandler;
