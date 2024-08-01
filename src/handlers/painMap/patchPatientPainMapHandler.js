import SegimedAPIError from "../../error/SegimedAPIError.js";
import { PatientPainMap } from "../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment";

const patchPatientPainMapHandler = async (body,{transaction}) => {
  try {
    //Validación. Si se envía el objeto painRecordsToUpdate pero es diferente a un array, retorna error
    if (body.painRecordsToUpdate && !Array.isArray(body.painRecordsToUpdate)) {
      throw new SegimedAPIError(
        "Los datos proporcionados no se encuentran en un formato válido o no fueron enviados",
        400
      );
    }

    //Validación. Si no vienen zonas de dolor para actualizar, se retorna []
    if (body.painRecordsToUpdate && body.painRecordsToUpdate?.length !== 0) {
      const patientPainMapping = await mapPainRecord(body.painRecordsToCreate[0]);
      patientPainMapping.painOwner = body.patient
      patientPainMapping.painRecorder = contextService.get('request:user').userId
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
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(
      "Hubo un error durante el proceso de actualización o creación del mapeo de las zonas de dolor." +
        error.message,
      500
    );
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
        painRecorder: body.patient,
        scheduling: body.schedulingId,
        medicalEvent: body.medicalEventId
    };
}

export default patchPatientPainMapHandler;
