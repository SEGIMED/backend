import SegimedAPIError from "../../error/SegimedAPIError.js";
import { PatientPainMap } from "../../databaseConfig.js";
import moment from "moment";
import contextService from "request-context";

const patchPatientPainMapHandler = async (body) => {
    try {
        const patientPainMapping = await mapPainRecord(body);

        const updatedPainRecord = await PatientPainMap.update(
            patientPainMapping ,
            {
                where: {
                    id: body.patientPainMapId
                }
            }
        );
        
        const update = await PatientPainMap.findByPk(body.patientPainMapId);
        return update;
    } catch (error) {
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