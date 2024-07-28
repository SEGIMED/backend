import SegimedAPIError from "../../error/SegimedAPIError.js";
import contextService from "request-context";
import { PatientPainMap } from "../../databaseConfig.js";
import moment from "moment";

const patchPatientPainMapHandler = async (body) => {
    try {
        const patientPainMapping = await mapPainRecord(body.painRecordsToCreate[0]);
        patientPainMapping.painOwner = body.patient
        patientPainMapping.painRecorder = contextService.get('request:user').userId
        
        const [updatedPainRecord, created] = await PatientPainMap.findOrCreate({
            where: {
                id: body.patient
            },
            defaults: patientPainMapping
        });
        
        if (!created) {
            await updatedPainRecord.update(patientPainMapping);
        }
       
        return updatedPainRecord;
    } catch (error) {
        console.log(error);
        throw new SegimedAPIError('Hubo un error durante el proceso de actualización: ', 500);
    }
};

async function mapPainRecord(body) {
    return {
        isTherePain: body.isTherePain,
        painDuration: body.painDurationId,
        painScale: body.painScaleId,
        painType: body.painTypeId,
        painAreas: body.painAreas,
        painFrequency: body.painFrequencyId,
        isTakingAnalgesic: body.isTakingAnalgesic,
        doesAnalgesicWorks: body.doesAnalgesicWorks,
        isWorstPainEver: body.isWorstPainEver,
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
        painRecorder: body.patient
    };
}

export default patchPatientPainMapHandler