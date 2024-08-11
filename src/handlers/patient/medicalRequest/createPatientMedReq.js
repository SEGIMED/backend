import models from "../../../databaseConfig.js";

const createPatientMedReq = async (body, patientId) => {
  const { physicianId, reqTypes, message } = body;
  try {
    const [newPatientMedReq, create] =
      await models.PatientMedicalReq.findOrCreate({
        where: { patientId: patientId },
        defaults: {
          physicianId,
          reqTypes,
          message,
        },
      });
    return newPatientMedReq;
  } catch (error) {
    throw new Error(error);
  }
};

export default createPatientMedReq;
