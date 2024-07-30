import SegimedAPIError from "../../error/SegimedAPIError.js";
import { PatientPainMap } from "../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment";

const patchPatientPainMapHandler = async (body) => {
    body= body.painRecordsToUpdate[0]
//TODO validación para ver que si traiga algo el body y misma lógica que el patch de signos vitales para proceder en diversos casos.
try {
    const patientPainMapping = await mapPainRecord(body);
        const[affectedCount,[updatedPainRecord]] = await PatientPainMap.update(
            patientPainMapping ,
            {
                where: {
                    id: body.patientPainMapId
                },
                returning: true,
            }
        );

        return updatedPainRecord;
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
        painRecorder: contextService.get('request:user').userId
    };
}

export default patchPatientPainMapHandler