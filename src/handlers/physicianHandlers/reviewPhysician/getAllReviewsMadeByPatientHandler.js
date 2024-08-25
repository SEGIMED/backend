import { PhysicianReview } from "../../../databaseConfig.js";

const getAllReviewsMadeByPatientHandler = async (patientId) => {
  try {
    const allReviewsForPatient = await PhysicianReview.findAll({
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

export default getAllReviewsMadeByPatientHandler;
