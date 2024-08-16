const interconsultationsMapper = (interconsultations) => {
  return interconsultations.map((interconsultation) => {
    if (interconsultation.interconsultationStatus == 7) {
      return {
        timestamp: interconsultation.interconsultationEndTimestamp,
        chiefComplaint: interconsultation.reasonForConsultation,
        physician: {
          name: interconsultation.queriedPhysician.name,
          lastname: interconsultation.queriedPhysician.lastname,
        },
        physicianRequested: {
          name: interconsultation.requestingPhysician.name,
          lastname: interconsultation.requestingPhysician.lastname,
        },
        attendancePlace: {
          alias: "Interconsulta Online",
        },
        physicianComments: `requestingPhysician: ${interconsultation.medicalOpinion}`,
        historyOfPresentIllness: `Consultante Dr: ${interconsultation.queriedPhysician.lastname} ${interconsultation.queriedPhysician.name} 
      Resumen del problema: ${interconsultation.problemResume}. 
      Opinion del especialista Dr. ${interconsultation.requestingPhysician.lastname} ${interconsultation.requestingPhysician.name}:
      ${interconsultation.medicalOpinion}`,
      };
    }
  });
};

export default interconsultationsMapper;
