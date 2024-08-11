import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const getPatientMedReq = async (patientId) => {
  try {
    const patientMedReq = await models.PatientMedicalReq.findAll({
      where: { patientId: patientId },
      include: [
        {
          model: models.User,
          as: "patientReq",
          attributes: ["name"],
        },
        {
          model: models.User,
          as: "physicianReq",
          attributes: ["name"],
        },
      ],
    });
    console.log(patientMedReq);
    return patientMedReq;
  } catch (error) {
    throw new SegimedAPIError("Error fetching patient medical request", 500);
  }
};

export default getPatientMedReq;
