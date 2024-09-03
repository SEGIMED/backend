import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const getPatientMedReq = async (field, userId) => {
  try {
    const patientMedReq = await models.PatientMedicalReq.findAll({
      where: { [field]: userId },
      include: [
        {
          model: models.User,
          as: "patientReq",
          attributes: ["name", "lastname"],
        },
        {
          model: models.User,
          as: "physicianReq",
          attributes: ["name", "lastname"],
        },
      ],
    });
    return patientMedReq;
  } catch (error) {
    throw new SegimedAPIError("Error fetching patient medical request", 500);
  }
};

export default getPatientMedReq;
