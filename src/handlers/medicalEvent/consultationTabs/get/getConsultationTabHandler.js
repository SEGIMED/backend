import getGlycemiaRecordsHandler from "../../../glycemiaRecords/getGlycemiaRecordsHandler.js";
import getFunctionalClassHandler from "../../../patient/patientRisk/getFunctionalClassHandler.js";
import getVitalSignsByMedicalEventHandler from "../../../vitalSigns/getVitalSignsByMedicalEventHandler.js";
import getDiagnosticsTabHandler from "../extras/getDiagnosticsTabHandler.js";
import getPatientDataHandler from "../extras/getPatientDataHandler.js";
import getPhysicalExaminarionTabHandler from "./getPhysicalExaminarionTabHandler.js";

const getConsultationTabHandler = async ({ id }) => {
  try {
    const patient = await getPatientDataHandler({ id });
    const glycemia = await getGlycemiaRecordsHandler({ medicalEvent: id });
    const functionalClass = await getFunctionalClassHandler({
      medicalEvent: id,
    });
    const vitalSigns = await getVitalSignsByMedicalEventHandler({ id });
    const diagnostic = await getDiagnosticsTabHandler({ id });
    const physicalExamination = await getPhysicalExaminarionTabHandler({ id });
    return {
      patient,
      glycemia,
      functionalClass,
      evolution: diagnostic.physicianComments,
      physicalExamination,
      diagnostic,
      anamnesis: diagnostic.historyOfPresentIllness,
      vitalSigns,
    };
  } catch (error) {
    throw new Error(
      "Ocurrió un error al recuperar los datos de la consulta: " + error.message
    );
  }
};
export default getConsultationTabHandler;
