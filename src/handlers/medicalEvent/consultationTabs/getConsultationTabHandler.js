import getVitalSignsByMedicalEventHandler from "../../vitalSigns/getVitalSignsByMedicalEventHandler.js";
import getDiagnosticsTabHandler from "./extras/getDiagnosticsTabHandler.js";

const getConsultationTabHandler = async ({ id }) => {
  try {
    const vitalSigns = await getVitalSignsByMedicalEventHandler({ id });
    const diagnostic = await getDiagnosticsTabHandler({ id });

    return {
      vitalSigns,
      evolution: diagnostic.physicianComments,
      diagnostic,
      anamnesis: diagnostic.historyOfPresentIllness,
    };
  } catch (error) {}
};
export default getConsultationTabHandler;
