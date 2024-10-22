import { CatConsultationReason, MedicalEvent } from "../../databaseConfig.js";

const updateMedicalEventHandler = async ({
  id,
  medicalEvent,
  appointmentSchedule,
  transaction,
}) => {
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
        reasonForConsultationId: medicalEvent.reasonForConsultationId,
      },
      {
        where: {
          id: id,
        },
        returning: true,
        plain: true,
        transaction,
      }
    );

    if (!medicalEvent) throw new Error("No se encontró la Consulta.");

    const consultationReason = await CatConsultationReason.findByPk(
      medicalEvent.reasonForConsultationId,
      { transaction }
    );
    if (!consultationReason)
      throw new Error("No se encontró el motivo de consulta.");
    if (appointmentSchedule) {
      appointmentSchedule.reasonForConsultation =
        consultationReason.description;
      await appointmentSchedule.save({ transaction });
    } else {
      throw new Error("No se encontró el agendamiento de la cita.");
    }

    return true;
  } catch (error) {
    throw new Error(
      "Hubo un error al actualizar la consulta: " + error.message
    );
  }
};

export default updateMedicalEventHandler;
