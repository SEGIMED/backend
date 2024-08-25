import { PatientHeartFailureClassification } from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";

const createHeartFailureClassificationHandler = async (body) => {
  const { patientId, heartFailureClassificationId } = body;

  try {
    const newHeartFailureClassification =
      await PatientHeartFailureClassification.create({
        patient: patientId,
        heartFailureClassification: heartFailureClassificationId,
        physician: contextService.get("request:user").userId,
        registerTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
      });
    return newHeartFailureClassification;
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de creación.",
      500
    );
  }
};

export default createHeartFailureClassificationHandler;
