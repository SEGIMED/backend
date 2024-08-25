import { PatientReview } from "../../../databaseConfig.js";

const getAllReviewsMadeByPhysicianHandler = async (physicianId) => {
  try {
    const allReviewsForPhysician = await PatientReview.findAll({
      where: {
        physicianId: physicianId,
      },
    });

    return allReviewsForPhysician;
  } catch (error) {
    throw new Error(
      "Ha habido un error al cargar las reseña: " + error.message
    );
  }
};

export default getAllReviewsMadeByPhysicianHandler;
