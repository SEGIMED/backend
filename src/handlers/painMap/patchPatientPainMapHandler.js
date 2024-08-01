import SegimedAPIError from "../../error/SegimedAPIError.js";
import contextService from "request-context";
import { PatientPainMap } from "../../databaseConfig.js";
import moment from "moment";

const patchPatientPainMapHandler = async (body,{transaction}) => {
    try {
        const patientPainMapping = await mapPainRecord(body.painRecordsToCreate[0],body);
        patientPainMapping.painOwner = body.patient
        const [updatedPainRecord, created] = await PatientPainMap.findOrCreate({
            where: {
                scheduling: patientPainMapping.scheduling,
                medicalEvent: patientPainMapping.medicalEvent
            },
            defaults: patientPainMapping,
            transaction
        });
        
        if (!created) {
            await updatedPainRecord.update(patientPainMapping, {transaction});
        }
       
        return updatedPainRecord;
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de actualización: ', 500);
    }
};

async function mapPainRecord(props,body) {
    return {
        isTherePain: props.isTherePain,
        painDuration: props.painDurationId,
        painScale: props.painScaleId,
        painType: props.painTypeId,
        painAreas: props.painAreas,
        painFrequency: props.painFrequencyId,
        isTakingAnalgesic: props.isTakingAnalgesic,
        doesAnalgesicWorks: props.doesAnalgesicWorks,
        isWorstPainEver: props.isWorstPainEver,
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
        painRecorder: contextService.get('request:user').userId,
        scheduling: body.appointmentSchedule,
        medicalEvent: body.medicalEvent.id
    };
}

export default patchPatientPainMapHandler