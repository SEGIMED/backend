import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const getPatientMedReq = async (field, userId, status) => {
  try {
    // Construir el objeto where dinámicamente
    const whereClause = { [field]: userId };

    // Agregar el filtro de status si se proporciona
    if (status !== undefined) {
      whereClause.status = status;
    }

    const patientMedReq = await models.PatientMedicalReq.findAll({
      where: whereClause,
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
