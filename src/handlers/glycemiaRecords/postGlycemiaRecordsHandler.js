import models from "../../databaseConfig.js";

const postGlycemiaRecordsHandler = async ({
  glycemia,
  selfEvaluationEventId,
  medicalEvent,
  abnormalGlycemia,
  transaction,
}) => {
  try {
    if (!Array.isArray(glycemia))
      throw new Error("Los valores deben enviarse en un array.");

    if (glycemia.length === 0)
      throw new Error("Debe mandarse al menos un valor de glucemia.");

    if (glycemia.length > 4)
      throw new Error("No pueden mandarse más de 4 valores de glucemia.");

    const whereClause = medicalEvent
      ? { medicalEvent }
      : { selfEvaluationEvent: selfEvaluationEventId };

    const existingRecords = await models.GlycemiaRecords.findAll({
      where: whereClause,
      transaction,
    });

    if (medicalEvent) {
      const medicalEventData = await models.MedicalEvent.findByPk(medicalEvent);
      const preconsultation = await models.ProvisionalPreConsultation.findOne({
        where: { appointmentSchedule: medicalEventData.scheduling },
      });
      if (abnormalGlycemia !== undefined && abnormalGlycemia !== null) {
        preconsultation.abnormalGlycemia = abnormalGlycemia;
        await preconsultation.save({ transaction });
      }

      for (let i = 0; i < glycemia.length; i++) {
        if (i < existingRecords.length) {
          await existingRecords[i].update(
            { value: glycemia[i] },
            { transaction }
          );
        } else {
          await models.GlycemiaRecords.create(
            { value: glycemia[i], medicalEvent },
            { transaction }
          );
        }
      }
    } else if (selfEvaluationEventId) {
      const bulkData = glycemia.map((value) => ({
        value,
        selfEvaluationEvent: selfEvaluationEventId,
      }));
      await models.GlycemiaRecords.bulkCreate(bulkData, { transaction });
      return "Glucemia guardada correctamente.";
    }

    return true;
  } catch (error) {
    throw new Error("Hubo un error al guardar los datos: " + error.message);
  }
};

export default postGlycemiaRecordsHandler;
