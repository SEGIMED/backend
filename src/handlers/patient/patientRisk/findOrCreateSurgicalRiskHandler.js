import { PatientSurgicalRisk } from "../../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment-timezone";

const findOrCreateSurgicalRiskHandler = async ({
  patientId,
  surgicalRiskId,
  transaction = null,
}) => {
  try {
    const findOrCreateOptions = {
      where: {
        patient: patientId,
      },
      defaults: {
        risk: surgicalRiskId,
        physician: contextService.get("request:user").userId,
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
      },
    };

    if (transaction) {
      findOrCreateOptions.transaction = transaction;
    }

    const [surgicalRisk, created] = await PatientSurgicalRisk.findOrCreate(
      findOrCreateOptions
    );

    if (!created) {
      const updateOptions = {
        risk: surgicalRiskId,
        physician: contextService.get("request:user").userId,
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
      };

      if (transaction) {
        await surgicalRisk.update(updateOptions, { transaction });
      } else {
        await surgicalRisk.update(updateOptions);
      }
    }

    return true;
  } catch (error) {
    throw new Error(
      "Hubo un error durante el proceso de creación o actualización de riesgo quirúrgico: " +
        error.message
    );
  }
};

export default findOrCreateSurgicalRiskHandler;
