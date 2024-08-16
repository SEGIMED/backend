const interconsultationsMapper = (interconsultations) => {
  return interconsultations.map((interconsultation) => {
    console.log(interconsultation);
    return {
      timestamp: interconsultation.interconsultationEndTimestamp,
      chiefComplaint: interconsultation.reasonForConsultation,
      physician: {
        name: interconsultation.queriedPhysician.name,
        lastname: interconsultation.queriedPhysician.lastname,
      },
      attendancePlace: {
        alias: "Segimed Interconsulta Online",
      },
      physicianComments: `requestingPhysician: ${interconsultation.medicalOpinion}`,
      historyOfPresentIllness: `Resumen del problema: ${interconsultation.problemResume}. Opinion del especialista: ${interconsultation.medicalOpinion}`,
    };
  });
};

export default interconsultationsMapper;
