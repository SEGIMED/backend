import { PhysicianDetails, PhysicianReview } from "../../../databaseConfig.js";
import contextService from "request-context";
const regexPositiveNumbers = /^[1-9][0-9]*$/;

const createPhysicianReviewHandler = async (physicianId, body) => {
  try {
    const { reviewScore, comments } = body;
    const patientId = contextService.get("request:user").userId;

    if (
      !regexPositiveNumbers.test(reviewScore) ||
      reviewScore > 5 ||
      reviewScore < 1
    ) {
      throw new Error("La calificación debe ser un número entero entre 1 y 5");
    }

    //TODO Validation: the physitian and patient exsists

    const physicianReview = await PhysicianReview.create({
      reviewScore,
      physicianId,
      patientId,
      comments,
    });

    const physicianDetails = await PhysicianDetails.findOne({
      where: {
        physician: physicianId,
      },
    });
    if (physicianDetails) {
      const currentScore = physicianDetails.reviewsScore;
      const currentReviewsNumber = physicianDetails.numberOfReviews;
      const newReviewsNumber = currentReviewsNumber + 1;
      const newReviewsScore =
        (currentScore * currentReviewsNumber + reviewScore) / newReviewsNumber;
      physicianDetails.numberOfReviews = newReviewsNumber;
      physicianDetails.reviewsScore = newReviewsScore;
      await physicianDetails.save();
    } else {
      const physicianDetails = await PhysicianDetails.create({
        reviewsScore: reviewScore,
        physician: physicianId,
        numberOfReviews: 1,
      });
    }

    return "La reseña ha sido creada: ", physicianReview;
  } catch (error) {
    console.log(error);
    throw new Error("Ha habido un error al crear la reseña: " + error.message);
  }
};

export default createPhysicianReviewHandler;
