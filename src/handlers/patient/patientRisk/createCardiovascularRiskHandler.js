import { PatientCardiovascularRisk } from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";

const createOrUpdateCardiovascularRiskHandler = async (body) => {
  const { patientId, riskId } = body;

  try {
    const [cardiovascularRisk, created] =
      await PatientCardiovascularRisk.findOrCreate({
        where: {
          patient: patientId,
        },
        defaults: {
          risk: riskId,
          physician: contextService.get("request:user").userId,
          registerTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
        },
      });

    if (!created) {
      await cardiovascularRisk.update({
        risk: riskId,
        physician: contextService.get("request:user").userId,
        registerTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
      });
    }

    return cardiovascularRisk;
  } catch (error) {
    // Manejar errores
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de creación o actualización.",
      500
    );
  }
};

export default createOrUpdateCardiovascularRiskHandler;
