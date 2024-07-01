import contextService from "request-context";
import moment from "moment-timezone";
import {PatientPainMap} from "../../databaseConfig.js";


const createPatientPainMapHandler = async (body) => {
    const {
        painRecordsToCreate
    } = body;

    try {
        const mappedPainRecordsToCreate = painRecordsToCreate.map(painRecord => mapPainRecord(painRecord))
        const newPainRecords = await PatientPainMap.bulkCreate(
            mappedPainRecordsToCreate
        )
        return newPainRecords
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de creación.', 500)
    }
};

function mapPainRecord(painRecord){
    return {
        painDuration: painRecord.painDurationId,
        painScale: painRecord.painScaleId,
        painType: painRecord.painTypeId,
        painArea: painRecord.painAreaId,
        painFrequency: painRecord.painFrequencyId,
        painNotes: painRecord.painNotes,
        isTakingAnalgesic: painRecord.isTakingAnalgesic,
        doesAnalgesicWorks: painRecord.doesAnalgesicWorks,
        isWorstPainEver: painRecord.isWorstPainEver,
        painOwner: painRecord.painOwnerId,
        scheduling: painRecord.schedulingId,
        medicalEvent: painRecord.medicalEventId,
        timestamp : moment().format("YYYY-MM-DD HH:mm:ss z"),
        painRecorder : contextService.get('request:user').userId
    }
}

export default createPatientPainMapHandler;