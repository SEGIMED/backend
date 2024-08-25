import SegimedAPIError from "../../error/SegimedAPIError.js";
import { PatientPainMap } from "../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment";

const patchPatientPainMapHandler = async (body, { transaction }) => {
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
      const patientPainMapping = await mapPainRecord(
        body.painRecordsToUpdate[0],
        body
      );
      patientPainMapping.painOwner = body.patient;

      const [updatedPainRecord, created] = await PatientPainMap.findOrCreate({
        where: {
          scheduling: patientPainMapping.scheduling,
          medicalEvent: patientPainMapping.medicalEvent,
        },
        defaults: patientPainMapping,
        transaction,
      });
      if (!created) {
        await updatedPainRecord.update(patientPainMapping, { transaction });
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
async function mapPainRecord(props, body) {
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
    painRecorder: contextService.get("request:user").userId,
    scheduling: body.appointmentSchedule,
    medicalEvent: body.medicalEvent.id,
  };
}

export default patchPatientPainMapHandler;
