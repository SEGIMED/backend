import createPulmonaryHypertensionRiskHandler from "../../../patient/patientRisk/createPulmonaryHypertensionRiskHandler.js";
import findOrCreateCardiovascularRiskHandler from "../../../patient/patientRisk/findOrCreateCardiovascularRiskHandler.js";
import findOrCreateSurgicalRiskHandler from "../../../patient/patientRisk/findOrCreateSurgicalRiskHandler.js";

const postRisksHandler = async ({ risks, patientId, transaction }) => {
  try {
    const {
      cardiovascularRiskId,
      surgicalRiskId,
      pulmonaryHypertensionRiskId,
    } = risks;
    const cardiovascularRiskResponse =
      await findOrCreateCardiovascularRiskHandler({
        patientId,
        cardiovascularRiskId,
        transaction,
      });
    const surgicalRiskResponse = await findOrCreateSurgicalRiskHandler({
      patientId,
      surgicalRiskId,
      transaction,
    });
    const htpRiksResponse = await createPulmonaryHypertensionRiskHandler({
      patientId,
      pulmonaryHypertensionRiskId,
      transaction,
    });
    return {
      cardiovascularRiskResponse,
      surgicalRiskResponse,
      htpRiksResponse,
    };
  } catch (error) {
    throw new Error(
      "Ocurrio un error al guardar los riesgos: " + error.message
    );
  }
};
export default postRisksHandler;
