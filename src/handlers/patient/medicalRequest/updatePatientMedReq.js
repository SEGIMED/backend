import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import moment from "moment";
const TZ = process.env.TZ;

const updatePatientMedReq = async (newPatientMedReq, medReqId) => {
  const { physicianId, reqTypes, message, status } = newPatientMedReq;
  try {
    const patientMedReq = await models.PatientMedicalReq.update(
      {
        physicianId,
        reqTypes,
        message,
        status,
        updateAt: moment().tz(TZ).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        where: {
          id: medReqId,
        },
      }
    );
    return patientMedReq;
  } catch (error) {
    throw new SegimedAPIError("Error al actualizar la solicitud médica", 500);
  }
};

export default updatePatientMedReq;
