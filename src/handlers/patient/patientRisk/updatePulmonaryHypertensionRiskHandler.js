import { PatientPulmonaryHypertensionRisk } from "../../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment-timezone";

const updateHpRiskHandler = async (body) => {
  const { patientId, pulmonaryHypertensionRiskId } = body;

  try {
    const hpRisk = await PatientPulmonaryHypertensionRisk.findOne({
      where: { patient: patientId },
    });

    if (!hpRisk) {
      throw new Error(
        "No se encontró el riesgo de hipertensión pulmonar para este paciente."
      );
    }
    await hpRisk.update({
      pulmonaryHypertensionRisk: pulmonaryHypertensionRiskId,
      physician: contextService.get("request:user").userId,
      registerTimestamp: moment().toISOString(),
    });

    return hpRisk;
  } catch (error) {
    throw new Error("Hubo un error durante el proceso de actualización.");
  }
};

export default updateHpRiskHandler;
