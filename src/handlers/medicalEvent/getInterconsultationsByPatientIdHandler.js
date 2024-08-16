import { MedicalInterconsultations, User } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getInterconsultationsForPatientHandler = async (patientId) => {
  try {
    if (!patientId) {
      throw new SegimedAPIError("Patient ID is required.", 400);
    }

    // Consulta para obtener las interconsultas de un paciente específico
    const interconsultations = await MedicalInterconsultations.findAll({
      where: { patient: patientId },
      include: [
        {
          model: User,
          as: "requestingPhysician", // Alias para physicianRequester
          attributes: ["name", "lastname"],
        },
        {
          model: User,
          as: "queriedPhysician", // Alias para physicianQueried
          attributes: ["name", "lastname"],
        },
        {
          model: User,
          as: "patientDetails", // Alias para el paciente (por si se requiere más información del paciente)
          attributes: ["name", "lastname"],
        },
      ],
    });

    // if (!interconsultations || interconsultations.length === 0) {
    //   throw new SegimedAPIError(
    //     "No interconsultations found for the specified patient.",
    //     404
    //   );
    // }

    return interconsultations;
  } catch (error) {
    if (error instanceof SegimedAPIError) {
      throw error;
    } else {
      throw new SegimedAPIError(
        "Error retrieving interconsultations: " + error.message,
        500
      );
    }
  }
};

export default getInterconsultationsForPatientHandler;
