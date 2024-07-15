import SegimedAPIError from "../../error/SegimedAPIError.js";
import contextService from "request-context";
import moment from "moment-timezone";
import { PatientPainMap } from "../../databaseConfig.js";

const createPatientPainMapHandler = async (body) => {
  const patientPainMapping = mapPainRecord(body);
  console.log('HOLAAAAAA', patientPainMapping);
  try {
    const newPainRecords = await PatientPainMap.create(patientPainMapping);
    return newPainRecords;
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de creación.",
      500
    );
  }
};

function mapPainRecord(body) {
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
    painOwner: body.painOwnerId,
    scheduling: body.schedulingId,
    medicalEvent: body.medicalEventId,
    timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
    painRecorder: contextService.get("request:user").userId,
  };
}

export default createPatientPainMapHandler;
