import models from "../../databaseConfig.js";

const postGlycemiaRecordsHandler = async ({
  glycemia,
  selfEvaluationEventId,
  medicalEvent,
  transaction,
}) => {
  try {
    if (!Array.isArray(glycemia)) {
      throw new Error("Los valores deben enviarse en un array");
    }
    if (medicalEvent) {
      const bulkData = glycemia.map((value) => {
        return {
          value,
          medicalEvent,
        };
      });
      await models.GlycemiaRecords.bulkCreate(bulkData, { transaction });
    } else {
      const bulkData = glycemia.map((value) => {
        return {
          value,
          selfEvaluationEvent: selfEvaluationEventId,
        };
      });
      await models.GlycemiaRecords.bulkCreate(bulkData, { transaction });
    }

    return "Glicemia guardada correctamente.";
  } catch (error) {
    throw new Error("Hubo un error al guardar los datos: " + error.message);
  }
};
export default postGlycemiaRecordsHandler;
