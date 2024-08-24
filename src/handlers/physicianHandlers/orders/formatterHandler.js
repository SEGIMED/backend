export const formatterHandler = (array) => {
  return array.map(
    ({
      patientId,
      physicianId,
      orderTypes,
      medicalPrescriptionId,
      prescription_modifications_hist_id,
      indications,
      diagnostic,
      additionalText,
      date,
      patient,
      physician,
      medicalReq,
      medicationPrescription, // La primera instancia de medicationPrescription
    }) => {
      const {
        startTimestamp,
        medicationPrescription: prescriptionModifications, // La segunda instancia de medicationPrescription
      } = medicationPrescription;

      return {
        patientId,
        physicianId,
        orderTypes,
        medicalPrescriptionId,
        prescription_modifications_hist_id,
        indications,
        diagnostic,
        additionalText,
        date,
        patient: `${patient.name} ${patient.lastname}`,
        physician: `${physician.name} ${physician.lastname}`,
        medicalReq: medicalReq.reqTypes,
        startTimestamp,
        prescriptionModifications: prescriptionModifications.map(
          (modification) => ({
            modificationTimestamp: modification.modificationTimestamp,
            observations: modification.observations,
            indications: modification.indications,
            drugDetail: {
              dose: `${modification.drugDetailPresentation.drugName.name} ${modification.drugDetailPresentation.dose} ${modification.drugDetailPresentation.measureUnit.name}`,
            },
          })
        ),
      };
    }
  );
};
