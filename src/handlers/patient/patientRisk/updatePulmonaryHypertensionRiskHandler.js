import { PatientPulmonaryHypertensionRisk } from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const updateHpRiskHandler = async (body) => {
  const { patientId } = body;

  try {
    const updateHpRisk = await PatientPulmonaryHypertensionRisk.update(
      {
        pulmonaryHypertensionRisk: body.pulmonaryHypertensionRiskId,
      },
      {
        where: {
          patient: patientId,
        },
        returning: true,
        plain: true,
      }
    );
    return updateHpRisk[1];
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de actualización.",
      500
    );
  }
};

export default updateHpRiskHandler;
