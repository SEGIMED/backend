import { PhysicianReview } from "../../../databaseConfig.js";

const getAllReviewsForPhisicianHandler = async (physicianId) => {
  try {
    const allReviewsForPhysician = await PhysicianReview.findAll({
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

export default getAllReviewsForPhisicianHandler;
