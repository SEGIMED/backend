import {
  AppointmentScheduling,
  CatConsultationReason,
  MedicalEvent,
  sequelize,
} from "../../databaseConfig.js";

const updateMedicalEventHandler = async ({id, medicalEvent, appointmentSchedule, transaction}) => {
  try {
    await MedicalEvent.update(
      {
        physicianComments: medicalEvent.physicianComments,
        historyOfPresentIllness: medicalEvent.historyOfPresentIllness,
        reviewOfSystems: medicalEvent.reviewOfSystems,
        treatmentPlan: medicalEvent.treatmentPlan,
        pendingDiagnosticTest: medicalEvent.pendingDiagnosticTest,
        alarmPattern: medicalEvent.alarmPattern,
        primaryDiagnostic: medicalEvent.primaryDiagnostic,
        diagnosticNotes: medicalEvent.diagnosticNotes,
        reasonForConsultationId: medicalEvent.reasonForConsultationId
      },
      {
        where: {
          id: id,
        },
        returning: true,
        plain: true,
      },
      {
        transaction,
      }
    );

    if (!medicalEvent) throw new Error("No se encontró la Consulta.");
 
    const consultationReasonName = await CatConsultationReason.findByPk(medicalEvent.reasonForConsultationId)
    appointmentSchedule.reasonForConsultation = consultationReasonName.description;
    appointmentSchedule.save();

    

    return true;
  } catch (error) {
    throw new Error(
      "Hubo un error al actualizar la consulta: " + error.message
    );
  }
};

export default updateMedicalEventHandler;
