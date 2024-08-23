import models from "../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment";

const physicalSelfEvaluationHandler = async (body) => {
    try {
        
        const data = await models.PatientPainMap.create({
            painDuration,
            painScale,
            painType,
            painFrequency,
            isTakingAnalgesic,
            doesAnalgesicWorks,
            isWorstPainEver,
            painOwner,
            painRecorder,
            timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
            painRecorder: contextService.get('request:user').userId
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export default physicalSelfEvaluationHandler;