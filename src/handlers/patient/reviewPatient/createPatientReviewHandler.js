import { PatientReview } from "../../../databaseConfig.js";

// const regexPositiveNumbers = /^[1-9][0-9]*$/;

const createPatientReviewHandler = async (patientId, body) => {
  try {
    let { comments, reviewScore, physicianId } = body;
    
    reviewScore = JSON.parse(body.reviewScore);

    for (let i = 0; i < reviewScore.length; i++) {
      if (isNaN(reviewScore[i]) || reviewScore[i] > 5 || reviewScore[i] < 1) {
        throw new Error(
          "La calificación debe ser un número entero entre 1 y 5"
        );
      }
    }

    //TODO Validation: the physitian and patient exsists

    const patientReview = await PatientReview.create({
      reviewScore,
      physicianId,
      patientId,
      comments,
    });

    return "La reseña ha sido creada: ", patientReview;
  } catch (error) {
    throw new Error("Ha habido un error al crear la reseña: " + error.message);
  }
};

export default createPatientReviewHandler;
