import createPulmonaryHypertensionRiskHandler from "../../../patient/patientRisk/createPulmonaryHypertensionRiskHandler.js";
import findOrCreateCardiovascularRiskHandler from "../../../patient/patientRisk/findOrCreateCardiovascularRiskHandler.js";
import findOrCreateSurgicalRiskHandler from "../../../patient/patientRisk/findOrCreateSurgicalRiskHandler.js";

const postRisksHandler = async ({ risks, patientId, transaction }) => {
  try {
    const {
      cardiovascularRiskId,
      surgicalRiskId,
      pulmonaryHypertensionRiskId,
    } = risks || {};

    const cardiovascularRiskResponse = cardiovascularRiskId
      ? await findOrCreateCardiovascularRiskHandler({
          patientId,
          cardiovascularRiskId,
          transaction,
        })
      : null;

    const surgicalRiskResponse = surgicalRiskId
      ? await findOrCreateSurgicalRiskHandler({
          patientId,
          surgicalRiskId,
          transaction,
        })
      : null;

    const htpRiksResponse = pulmonaryHypertensionRiskId
      ? await createPulmonaryHypertensionRiskHandler({
          patientId,
          pulmonaryHypertensionRiskId,
          transaction,
        })
      : null;

    return {
      cardiovascularRiskResponse,
      surgicalRiskResponse,
      htpRiksResponse,
    };
  } catch (error) {
    throw new Error(
      "Ocurrió un error al guardar los riesgos: " + error.message
    );
  }
};

export default postRisksHandler;
