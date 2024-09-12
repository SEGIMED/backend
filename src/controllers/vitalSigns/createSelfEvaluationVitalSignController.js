import { SelfEvaluationEvent, sequelize } from "../../databaseConfig.js";
import postGlycemiaRecordsHandler from "../../handlers/glycemiaRecords/postGlycemiaRecordsHandler.js";
import newVitalSignHandler from "../../handlers/medicalHistory/createVitalSignsHandler.js";
import contextService from "request-context";

const createSelfEvaluationVitalSignController = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { vitalSigns, glycemia } = req.body;

    const selfEvaluationEvent = await SelfEvaluationEvent.create(
      {
        patient: contextService.get("request:user").userId,
      },
      { transaction }
    );

    await newVitalSignHandler({
      vitalSigns,
      selfEvaluationEventId: selfEvaluationEvent.id,
      transaction,
    });
    await postGlycemiaRecordsHandler({
      glycemia,
      selfEvaluationEventId: selfEvaluationEvent.id,
      transaction,
    });
    await transaction.commit();
    return res.status(201).send("Datos guardados correctamente.");
  } catch (error) {
    await transaction.rollback();
    return res.status(500).send(error.message);
  }
};
export default createSelfEvaluationVitalSignController;
