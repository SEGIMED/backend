import SegimedAPIError from "../../error/SegimedAPIError.js";
import { PatientPainMap } from "../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment";

const patchPatientPainMapHandler = async (body) => {
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
      body = body.painRecordsToUpdate[0];
      const patientPainMapping = await mapPainRecord(body);
      const [affectedCount, [updatedPainRecord]] = await PatientPainMap.update(
        patientPainMapping,
        {
          where: {
            id: body.patientPainMapId,
          },
          returning: true,
        }
      );
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
    painRecorder: contextService.get("request:user").userId,
  };
}

export default patchPatientPainMapHandler;
