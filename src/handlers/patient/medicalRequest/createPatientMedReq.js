import models from "../../../databaseConfig.js";
import { validationPatientMedReq } from "../../../validations/validationPatientMedReq.js";
import moment from "moment";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
const TZ = process.env.TZ;

const createPatientMedReq = async (body, patientId) => {
  validationPatientMedReq(body);
  const { physicianId, reqTypes, message } = body;

  try {
    const [newPatientMedReq, create] =
      await models.PatientMedicalReq.findOrCreate({
        where: { patientId, physicianId, reqTypes, status: false },
        defaults: {
          patientId,
          physicianId,
          reqTypes,
          createdAt: moment().tz(TZ).format("YYYY-MM-DD HH:mm:ss"),
          message,
          status: false,
        },
        raw: true,
      });
    if (!create) {
      throw new SegimedAPIError("The medical request already exists");
    }
    return newPatientMedReq;
  } catch (error) {
    throw new SegimedAPIError(
      500,
      "Error durante el proceso de registro",
      error.message
    );
  }
};

export default createPatientMedReq;
