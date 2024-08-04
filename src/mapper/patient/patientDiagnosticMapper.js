export const mapPatientDiagnostic = (patientDiagnostic) => {
  return {
    id: patientDiagnostic.id,
    timestamp: patientDiagnostic.timestamp,
    diagnosticNotes: patientDiagnostic.diagnosticNotes,
    disease: patientDiagnostic.diagnosedDisease.name,
    diseaseCode: patientDiagnostic.diagnosedDisease.diseaseCode,
    diseaseEtiology: patientDiagnostic.diseaseEtiology,
  };
};
