const interconsultationsMapper = (interconsultations) => {
  // console.log("mapper interconsultation", interconsultations);
  return interconsultations.map((interconsultation) => {
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
    };
  });
};

export default interconsultationsMapper;
