import models, { PatientPainMap } from "../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment";

const patchPatientPainMapHandler = async ({ id, painMap, transaction }) => {
  try {
    const medicalEventData = await models.MedicalEvent.findByPk(id);
    if (!medicalEventData) {
      throw new Error(
        "No se encontró el evento médico con el ID proporcionado."
      );
    }

    const schedulingData = await models.AppointmentScheduling.findOne({
      where: {
        id: medicalEventData.scheduling,
      },
    });
    if (!schedulingData) {
      throw new Error(
        "No se encontró la programación asociada al evento médico."
      );
    }

    const [patientPainMapping, created] = await PatientPainMap.findOrCreate({
      where: {
        scheduling: schedulingData.id,
        medicalEvent: medicalEventData.id,
      },
      defaults: {
        isTherePain: painMap.isTherePain ?? null,
        painDuration: painMap.painDuration ?? null,
        painScale: painMap.painScale ?? null,
        painType: painMap.painType ?? null,
        painAreas: painMap.painAreas ?? [],
        painFrequency: painMap.painFrequency ?? null,
        isTakingAnalgesic: painMap.isTakingAnalgesic ?? null,
        doesAnalgesicWorks: painMap.doesAnalgesicWorks ?? null,
        isWorstPainEver: painMap.isWorstPainEver ?? null,
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
        painRecorder: contextService.get("request:user").userId,
        scheduling: schedulingData.id,
        medicalEvent: medicalEventData.id,
      },
      transaction,
    });

    if (!created) {
      const updatedPainMapping = {
        isTherePain: painMap.isTherePain ?? patientPainMapping.isTherePain,
        painDuration: painMap.painDuration ?? patientPainMapping.painDuration,
        painScale: painMap.painScale ?? patientPainMapping.painScale,
        painType: painMap.painType ?? patientPainMapping.painType,
        painAreas: painMap.painAreas ?? patientPainMapping.painAreas,
        painFrequency:
          painMap.painFrequency ?? patientPainMapping.painFrequency,
        isTakingAnalgesic:
          painMap.isTakingAnalgesic ?? patientPainMapping.isTakingAnalgesic,
        doesAnalgesicWorks:
          painMap.doesAnalgesicWorks ?? patientPainMapping.doesAnalgesicWorks,
        isWorstPainEver:
          painMap.isWorstPainEver ?? patientPainMapping.isWorstPainEver,
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
      };

      await patientPainMapping.update(updatedPainMapping, { transaction });
    }

    return true;
  } catch (error) {
    throw new Error(
      "Hubo un error durante el proceso de actualización o creación del mapeo de las zonas de dolor: " +
        error.message
    );
  }
};

export default patchPatientPainMapHandler;
