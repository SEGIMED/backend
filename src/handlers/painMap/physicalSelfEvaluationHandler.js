import models, { sequelize } from "../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment";
import { validateSelfEvaluation } from "../../validations/validateSelfEvaluation.js";
const TZ = process.env.TZ;

const physicalSelfEvaluationHandler = async (body) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      isTherePain,
      painDuration,
      painScale,
      painType,
      painFrequency,
      isTakingAnalgesic,
      doesAnalgesicWorks,
      isWorstPainEver,
      painOwner,
      painRecorder,
      painAreas,
    } = body;
    await validateSelfEvaluation(
      painDuration,
      painScale,
      painType,
      painFrequency,
      isTakingAnalgesic,
      doesAnalgesicWorks,
      isWorstPainEver,
      painOwner,
      painAreas
    );
    const selfEvaluationEvent = await models.SelfEvaluationEvent.create(
      {
        patient: contextService.get("request:user").userId,
      },
      { transaction }
    );
    const data = await models.PatientPainMap.create(
      {
        isTherePain,
        painDuration,
        painScale,
        painType,
        painFrequency,
        isTakingAnalgesic,
        doesAnalgesicWorks,
        isWorstPainEver,
        painOwner,
        painRecorder,
        painAreas,
        timestamp: moment().tz(TZ).toISOString(),
        painRecorder: contextService.get("request:user").userId,
        selfEvaluationEvent: selfEvaluationEvent.id,
      },
      {
        transaction,
      }
    );

    await transaction.commit();
    return data;
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error(error.message);
  }
};

export default physicalSelfEvaluationHandler;
