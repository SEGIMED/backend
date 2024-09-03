import {
  MedicalInterconsultations,
  User,
  CatSchedulingStatus,
  MedicalInterconsultationFile,
} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import contextService from "request-context";

const getInterconsultationDetailsHandler = async (id) => {
  const loggedPhysicianId = contextService.get("request:user").userId;

  try {
    const interconsultation = await MedicalInterconsultations.findByPk(id, {
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
          model: CatSchedulingStatus,
          as: "statusCategory",
          attributes: ["name"],
        },
        {
          model: MedicalInterconsultationFile,
          as: "files",
          attributes: ["fileURL", "fileName"],
        },
      ],
    });

    if (!interconsultation) {
      throw new SegimedAPIError("Interconsulta no encontrada", 404);
    }
    if (
      interconsultation.physicianRequester !== loggedPhysicianId &&
      interconsultation.physicianQueried !== loggedPhysicianId
    ) {
      throw new SegimedAPIError(
        "Usted no tiene acceso a esta interconsulta.",
        404
      );
    }
    return interconsultation;
  } catch (error) {
    if (error instanceof SegimedAPIError) {
      throw error;
    }
    throw new SegimedAPIError(
      "Error obteniendo la interconsulta: " + error.message,
      500
    );
  }
};

export default getInterconsultationDetailsHandler;
