import { sequelize } from "../../../../databaseConfig.js";
import postGlycemiaRecordsHandler from "../../../glycemiaRecords/postGlycemiaRecordsHandler.js";
import newPhysicalExaminationHandler from "../../../patient/patientPhysicianExam/createPatientPhysicalExaminationHandler.js";
import findOrCreateFunctionalClassHandler from "../../../patient/patientRisk/findOrCreateFunctionalClassHadler.js";
import updateOrCreateVitalSignsHandler from "../../../vitalSigns/updateVitalSignsHandler.js";
import updateMedicalEventHandler from "../../updateMedicalEventHandler.js";
import postDiagnosticsTabHandler from "../extras/postDiagnosticsTabHandler.js";

const postConsultationTabHandler = async ({
  id,
  vitalSigns,
  glycemia,
  abnormalGlycemia,
  functionalClass,
  diagnostics,
  appointmentSchedule,
  medicalEvent,
  physicalExamination,
}) => {
  const transaction = await sequelize.transaction();
  try {
    const vitalSignsResponse = vitalSigns
      ? await updateOrCreateVitalSignsHandler({ id, vitalSigns, transaction })
      : null;

    const glycemiaResponse = glycemia
      ? await postGlycemiaRecordsHandler({
          glycemia,
          abnormalGlycemia,
          medicalEvent: id,
          transaction,
        })
      : null;

    const functionalClassResponse = functionalClass
      ? await findOrCreateFunctionalClassHandler({
          appointmentSchedule,
          functionalClass,
          transaction,
        })
      : null;

    const diagnosticResponse = diagnostics
      ? await postDiagnosticsTabHandler({
          id,
          diagnostics,
          appointmentSchedule,
          transaction,
        })
      : null;

    const medicalEventResponse = medicalEvent
      ? await updateMedicalEventHandler({
          id,
          medicalEvent,
          appointmentSchedule,
          transaction,
        })
      : null;

    const physicalExaminationResponse = physicalExamination
      ? await newPhysicalExaminationHandler({
          id,
          appointmentSchedule,
          physicalExamination,
        })
      : null;

    await transaction.commit();
    return {
      vitalSignsResponse,
      glycemiaResponse,
      functionalClassResponse,
      diagnosticResponse,
      medicalEventResponse,
      physicalExaminationResponse,
    };
  } catch (error) {
    await transaction.rollback();
    console.log(error)
    throw new Error(
      "Ocurrió un error al guardar los datos de consulta: " + error.message
    );
  }
};

export default postConsultationTabHandler;
