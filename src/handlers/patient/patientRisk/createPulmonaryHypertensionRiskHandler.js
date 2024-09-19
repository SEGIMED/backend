import { PatientPulmonaryHypertensionRisk } from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";

const createPulmonaryHypertensionRiskHandler = async ({
  patientId,
  pulmonaryHypertensionRiskId,
  transaction = null,
}) => {
  try {
      await PatientPulmonaryHypertensionRisk.create(
        {
          patient: patientId,
          pulmonaryHypertensionRisk: pulmonaryHypertensionRiskId,
          physician: contextService.get("request:user").userId,
          registerTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
        },
        transaction ? { transaction } : {}
      );

    return true
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de creación.",
      500
    );
  }
};

export default createPulmonaryHypertensionRiskHandler;
