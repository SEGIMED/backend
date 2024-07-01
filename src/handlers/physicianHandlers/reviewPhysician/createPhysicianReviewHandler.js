import {PhysicianDetails, PhysicianReview} from "../../../databaseConfig.js";

const regexPositiveNumbers = /^[1-9][0-9]*$/;

const createPhysicianReviewHandler = async (physicianId, body) => {
  try {
    
    const { reviewScore, patientId, comments } = body;

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
        physician: physicianId
      }
    })
    const currentScore = physicianDetails.reviewsScore
    const currentReviewsNumber = physicianDetails.numberOfReviews
    if( ! currentScore && ! currentReviewsNumber){
      physicianDetails.reviewsScore = reviewScore
      physicianDetails.numberOfReviews = 1
    }
    else {
      const newReviewsNumber = currentReviewsNumber + 1
      const newReviewsScore = ((currentScore * currentReviewsNumber) + reviewScore) / (newReviewsNumber)
      physicianDetails.reviewsScore = newReviewsScore
      physicianDetails.numberOfReviews = newReviewsNumber
    }
    await physicianDetails.save()

    return "La reseña ha sido creada: ", physicianReview;
  } catch (error) {
    throw new Error("Ha habido un error al crear la reseña: " + error.message);
  }
};

export default createPhysicianReviewHandler;
