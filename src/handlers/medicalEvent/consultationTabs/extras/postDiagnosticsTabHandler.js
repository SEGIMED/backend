import models from "../../../../databaseConfig.js";

const postDiagnosticsTabHandler = async ({
  id,
  diagnostics,
  appointmentSchedule,
  transaction,
}) => {
  try {
    if (!Array.isArray(diagnostics)) {
      throw new Error(
        "Los diagnosticos deben ser enviados como un array de números."
      );
    }

    const previousDiagnostics = await models.PatientDiagnostics.findAll({
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
      await models.PatientDiagnostics.destroy({
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
        patient: appointmentSchedule.patient,
        physicianOrder: null,
      }));
      await models.PatientDiagnostics.bulkCreate(diagnosticsToCreate, {
        transaction,
      });
    }

    return true;
  } catch (error) {
    throw new Error(
      "Ocurrió un error al guardar el diagnóstico: " + error.message
    );
  }
};
export default postDiagnosticsTabHandler;
