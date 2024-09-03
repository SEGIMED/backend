import { PatientPulmonaryHypertensionRisk } from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import contextService from "request-context";
import moment from "moment-timezone";

const updateHpRiskHandler = async (body) => {
  const { patientId } = body;

  try {
    const [updateHpRisk, created] =
      await PatientPulmonaryHypertensionRisk.findOrCreate({
        where: {
          patient: patientId,
        },
        defaults:{
            pulmonaryHypertensionRisk: body.pulmonaryHypertensionRiskId,
            physician: contextService.get('request:user').userId,
            registerTimestamp: moment().toISOString()
        },
        returning: true,
        plain: true,
      });
    return updateHpRisk;
  } catch (error) {
    console.log(error);
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de actualización.",
      500
    );
  }
};

export default updateHpRiskHandler;
