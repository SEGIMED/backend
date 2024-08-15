import models from "../../../databaseConfig.js";
import { validationPatientMedReq } from "../../../validations/validationPatientMedReq.js";
import moment from "moment";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const createPatientMedReq = async (body, patientId) => {
  validationPatientMedReq(body);
  const date = new Date();
  const { physicianId, reqTypes, message } = body;

  try {
    const [newPatientMedReq, create] =
      await models.PatientMedicalReq.findOrCreate({
        where: { patientId, physicianId, reqTypes, status: false },
        defaults: {
          patientId,
          physicianId,
          reqTypes,
          createdAt: moment(date).format("YYYY-MM-DD HH:mm:ss"),
          message,
          status: false,
        },
      });
    if (!create) {
      throw new SegimedAPIError("The medical request already exists");
    }
    return newPatientMedReq;
  } catch (error) {
    throw new SegimedAPIError(error);
  }
};

export default createPatientMedReq;
