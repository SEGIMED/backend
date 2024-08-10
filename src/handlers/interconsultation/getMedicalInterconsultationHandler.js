import {
  MedicalInterconsultations,
  User,
  MedicalInterconsultationFile,
} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import { Op } from "sequelize";

const getInterconsultationHandler = async (queryParams) => {
  try {
    const { status, physicianQueried, physicianRequester } = queryParams;

    // Construir el filtro dinámico según los queryParams
    const whereConditions = {};

    if (status) {
      whereConditions.interconsultationStatus = status;
    }

    if (physicianQueried) {
      whereConditions.physicianQueried = physicianQueried;
    }

    if (physicianRequester) {
      whereConditions.physicianRequester = physicianRequester;
    }

    // Realizar la consulta
    const interconsultations = await MedicalInterconsultations.findAll({
      where: whereConditions,
      include: [
        {
          model: User,
          as: "requestingPhysician",
          attributes: ["name", "lastname"],
        },
        {
          model: User,
          as: "patientDetails",
          attributes: ["name", "lastname"],
        },
        {
          model: User,
          as: "queriedPhysician",
          attributes: ["name", "lastname"],
        },
        {
          model: MedicalInterconsultationFile,
          as: "files",
          attributes: ["fileURL"],
        },
      ],
    });

    return interconsultations;
  } catch (error) {
    throw new SegimedAPIError(
      "Error obteniento interconsultas: " + error.message,
      500
    );
  }
};

export default getInterconsultationHandler;
