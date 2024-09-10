import {
  AppointmentScheduling,
  MedicalEvent,
  PatientDiagnostics,
  sequelize,
} from "../../databaseConfig.js";

const updateMedicalEventHandler = async (body) => {
  const { id, diagnostics, reasonForConsultation } = body;
  if (!Array.isArray(diagnostics)) {
    throw new Error(
      "Los diagnosticos deben ser enviados como un array de números."
    );
  }
  const transaction = await sequelize.transaction();
  try {
    const medicalEvent = await MedicalEvent.findOne({
      where: {
        id,
      },
    });
    await MedicalEvent.update(
      {
        physicianComments: body.physicianComments,
        historyOfPresentIllness: body.historyOfPresentIllness,
        reviewOfSystems: body.reviewOfSystems,
        treatmentPlan: body.treatmentPlan,
        pendingDiagnosticTest: body.pendingDiagnosticTest,
        alarmPattern: body.alarmPattern,
        primaryDiagnostic: body.primaryDiagnostic,
        diagnosticNotes: body.diagnosticNotes,
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

    const appointmentSchedule = await AppointmentScheduling.findOne({
      where: {
        id: medicalEvent.scheduling,
      },
    });
    appointmentSchedule.reasonForConsultation = reasonForConsultation;
    appointmentSchedule.save();

    const previousDiagnostics = await PatientDiagnostics.findAll({
      where: { medicalEvent: id },
      attributes: ["diagnostic"], 
    });

    const previousDiagnosticsIds = previousDiagnostics.map((d) => d.diagnostic);

    const deleteDiagnostics = previousDiagnosticsIds.filter(
      (d) => !diagnostics.includes(d)
    );
    const newDiagnostics = diagnostics.filter(
      (d) => !previousDiagnosticsIds.includes(d)
    );

    if (deleteDiagnostics.length > 0) {
      await PatientDiagnostics.destroy({
        where: {
          diagnostic: deleteDiagnostics,
          medicalEvent: id,
        },
        transaction,
      });
    }

    if (newDiagnostics.length > 0) {
      const diagnosticsToCreate = newDiagnostics.map((diagnostic) => ({
        diagnostic: diagnostic,
        medicalEvent: id,
        physicianOrder: null,
      }));
      console.log(diagnosticsToCreate)
      await PatientDiagnostics.bulkCreate(diagnosticsToCreate, { transaction });
    }

    await transaction.commit();

    return "Consulta actulizada correctamente.";
  } catch (error) {
    console.log(error)
    await transaction.rollback();
    throw new Error(
      "Hubo un error al actualizar la consulta: " + error.message
    );
  }
};

export default updateMedicalEventHandler;
