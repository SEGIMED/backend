import models from "../../databaseConfig.js";

const createComorbiditiesHandler = async ({ patientId, comorbiditiesList, transaction }) => {
  try {
    if (!Array.isArray(comorbiditiesList) || comorbiditiesList.length === 0) {
      throw new Error(
        "La lista de comorbilidades debe ser un array y no puede estar vacío."
      );
    }

    const previousComorbidities = await models.UserComorbidities.findAll({
      where: { patientId },
      transaction,
    });

    let newComorbidities;
    let deleteComorbidities;
    const previousDiseaseIds = previousComorbidities.map(
      (comorbidity) => comorbidity.diseaseId
    );
    if (previousComorbidities) {
      newComorbidities = comorbiditiesList.filter(
        (diseaseId) => !previousDiseaseIds.includes(diseaseId)
      );
      deleteComorbidities = previousDiseaseIds.filter(
        (diseaseId) => !comorbiditiesList.includes(diseaseId)
      );
    }
    if (deleteComorbidities.length > 0) {
      await models.UserComorbidities.destroy({
        where: {
          patientId,
          diseaseId: deleteComorbidities,
        },
        transaction,
      });
    }
    if (newComorbidities.length > 0) {
      const bulkData = newComorbidities.map((e) => {
        return {
          patientId,
          diseaseId: e,
        };
      });
      await models.UserComorbidities.bulkCreate(bulkData, { transaction });
    }
    return
  } catch (error) {
    throw new Error("Hubo un error al cargar los datos: " + error.message);
  }
};

export default createComorbiditiesHandler;
