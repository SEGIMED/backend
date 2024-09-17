
import getVitalSignsByMedicalEventHandler from "../../../vitalSigns/getVitalSignsByMedicalEventHandler.js";
import getDiagnosticsTabHandler from "../extras/getDiagnosticsTabHandler.js";
import getPhysicalExaminarionTabHandler from "./getPhysicalExaminarionTabHandler.js";

const getConsultationTabHandler = async ({ id }) => {
  try {
    const vitalSigns = await getVitalSignsByMedicalEventHandler({ id });
    const diagnostic = await getDiagnosticsTabHandler({ id });
    const physicalExamination = await getPhysicalExaminarionTabHandler({id})
    return {
      vitalSigns,
      evolution: diagnostic.physicianComments,
      physicalExamination,
      diagnostic,
      anamnesis: diagnostic.historyOfPresentIllness,
    };
  } catch (error) {}
};
export default getConsultationTabHandler;
