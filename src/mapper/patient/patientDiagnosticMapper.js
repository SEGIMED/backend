export const mapPatientDiagnostic = (patientDiagnostic) => {
  return {
    id: patientDiagnostic.id,
    timestamp: patientDiagnostic.timestamp,
    diagnosticNotes: patientDiagnostic.diagnosticNotes,
    disease: patientDiagnostic.diagnosedDisease,
    diseaseEtiology: patientDiagnostic.diseaseEtiology,
  };
};
