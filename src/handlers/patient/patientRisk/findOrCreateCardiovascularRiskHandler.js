import { PatientCardiovascularRisk } from "../../../databaseConfig.js";
import moment from "moment-timezone";
import contextService from "request-context";

const findOrCreateCardiovascularRiskHandler = async ({
  cardiovascularRiskId,
  patientId,
  transaction,
}) => {
  try {

    const [cardiovascularRisk, created] =
      await PatientCardiovascularRisk.findOrCreate({
        where: { patient: patientId },
        defaults: {
          risk: cardiovascularRiskId,
          physician: contextService.get("request:user").userId,
          registerTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
        },
        transaction,
      });

    if (!created) {

      cardiovascularRisk.risk = cardiovascularRiskId;
      cardiovascularRisk.physician = contextService.get("request:user").userId;
      cardiovascularRisk.registerTimestamp = moment().format(
        "YYYY-MM-DD HH:mm:ss z"
      );

      await cardiovascularRisk.save({ transaction });
    }

    return true;
  } catch (error) {
    throw new Error(
      "Hubo un error durante el proceso de creación o actualización de riesgo cardiovascular: " +
        error.message
    );
  }
};

export default findOrCreateCardiovascularRiskHandler;
