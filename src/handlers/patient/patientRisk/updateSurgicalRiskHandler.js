import { PatientSurgicalRisk } from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const updateSurgicalRiskHandler = async (body) => {
  const { patientId } = body;

  try {
    const updateSurgicalRisk = await PatientSurgicalRisk.update(
      {
        risk: body.surgicalRiskId,
      },
      {
        where: {
          patient: patientId,
        },
        returning: true,
        plain: true,
      }
    );
    return updateSurgicalRisk[1];
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de actualización.",
      500
    );
  }
};

export default updateSurgicalRiskHandler;
