import { PatientPulmonaryHypertensionRisk } from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import contextService from "request-context";
import moment from "moment-timezone";

const updateHpRiskHandler = async (body) => {
  const { patientId, pulmonaryHypertensionRiskId } = body;

  try {
    const [hpRisk, created] =
      await PatientPulmonaryHypertensionRisk.findOrCreate({
        where: {
          patient: patientId,
        },
        defaults: {
          pulmonaryHypertensionRisk: pulmonaryHypertensionRiskId,
          physician: contextService.get("request:user").userId,
          registerTimestamp: moment().toISOString(),
        },
        returning: true,
        plain: true,
      });

    if (!created) {
      await hpRisk.update({
        pulmonaryHypertensionRisk: pulmonaryHypertensionRiskId,
        physician: contextService.get("request:user").userId,
        registerTimestamp: moment().toISOString(),
      });
    }

    return hpRisk;
  } catch (error) {
    console.log(error);
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de actualización.",
      500
    );
  }
};

export default updateHpRiskHandler;
