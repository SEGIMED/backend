import { sequelize } from "../../../../databaseConfig.js";
import newPhysicalExaminationHandler from "../../../patient/patientPhysicianExam/createPatientPhysicalExaminationHandler.js";
import updateOrCreateVitalSignsHandler from "../../../vitalSigns/updateVitalSignsHandler.js";
import updateMedicalEventHandler from "../../updateMedicalEventHandler.js";
import postDiagnosticsTabHandler from "../extras/postDiagnosticsTabHandler.js";

const postConsultationTabHandler = async ({
  id,
  vitalSigns,
  diagnostics,
  appointmentSchedule,
  medicalEvent,
  physicalExamination,
}) => {
  const transaction = await sequelize.transaction();
  try {
    const vitalSignsResponse = await updateOrCreateVitalSignsHandler({
      id,
      vitalSigns,
      transaction,
    });
    const diagnosticResponse = await postDiagnosticsTabHandler({
      id,
      diagnostics,
      appointmentSchedule,
      transaction,
    });
    const medicalEventResponse = await updateMedicalEventHandler({
      id,
      medicalEvent,
      appointmentSchedule,
      transaction,
    });
    const physicalExaminationResponse = await newPhysicalExaminationHandler({
      id,
      appointmentSchedule,
      physicalExamination,
    });
    await transaction.commit();
    return {
      vitalSignsResponse,
      diagnosticResponse,
      medicalEventResponse,
      physicalExaminationResponse,
    };
  } catch (error) {
    await transaction.rollback();
    throw new Error(
      "Ocurrió un error al guardar los datos de consulta: " + error.message
    );
  }
};
export default postConsultationTabHandler;
