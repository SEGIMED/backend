import SegimedAPIError from "../../../error/SegimedAPIError.js";
import { PatientPainMap } from "../../databaseConfig.js";

const patchPatientPainMapHandler = async (body)=> {

    const patientPainMapping= mapPainRecord(body)
    try {
        const updatedPainRecord = await PatientPainMap.update(
            patientPainMapping
        )
        const update = await PatientPainMap.findByPk(body.patientPainMapId)
        
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de actualización: ', 500)
        
    }
};

function mapPainRecord(body){
    return {
        isTherePain:body.isTherePain,
        painDuration: body.painDurationId,
        painScale: body.painScaleId,
        painType: body.painTypeId,
        painAreas: body.painAreas,
        painFrequency: body.painFrequencyId,
        isTakingAnalgesic: body.isTakingAnalgesic,
        doesAnalgesicWorks: body.doesAnalgesicWorks,
        isWorstPainEver: body.isWorstPainEver,
        timestamp : moment().format("YYYY-MM-DD HH:mm:ss z"),
        painRecorder : contextService.get('request:user').userId
    }
}

export default patchPatientPainMapHandler