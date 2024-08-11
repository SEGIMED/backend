import models from "../../../databaseConfig.js";

const createPatientMedReq = async (body, patientId) => {
  const { physicianId, reqTypes, message } = body;

  try {
    const newPatientMedReq = await models.PatientMedicalReq.create({
      patientId,
      physicianId,
      reqTypes,
      message,
      status: false,
    });
    return newPatientMedReq;
  } catch (error) {
    throw new Error(error);
  }
};

export default createPatientMedReq;
