import models from "../../../databaseConfig.js";
import { validationPatientMedReq } from "../../../validations/validationPatientMedReq.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const createPatientMedReq = async (body, patientId) => {
  validationPatientMedReq(body);
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
    throw new SegimedAPIError(error);
  }
};

export default createPatientMedReq;
