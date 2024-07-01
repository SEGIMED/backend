import { PatientReview } from "../../../databaseConfig.js";
const regexPositiveNumbers = /^[1-9][0-9]*$/;

const patchPatientReviewHandler = async (id, update) => {
  try {
    if (!regexPositiveNumbers.test(id)) {
      throw new Error("El id de la reseña debe ser un entero positivo");
    }

    let { comments, reviewScore } = update;
    reviewScore = JSON.parse(update.reviewScore);

    const review = await PatientReview.findByPk(id);
    if (review.length === 0)
      throw new Error("No se encontró ninguna reseña asociada");
    await review.update({
      reviewScore,
      comments,
    });
    return review;
  } catch (error) {
    throw new Error(
      "Error haciendo la actualización de la reseña: " + error.message
    );
  }
};

export default patchPatientReviewHandler;
