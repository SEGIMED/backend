import { PatientReview } from "../../../databaseConfig.js";

const getAllReviewsForPatientHandler = async (patientId) => {
  try {
    const allReviewsForPatient = await PatientReview.findAll({
      where: {
        patientId: patientId,
      },
    });

    return allReviewsForPatient;
  } catch (error) {
    throw new Error(
      "Ha habido un error al cargar las reseña: " + error.message
    );
  }
};

export default getAllReviewsForPatientHandler;
