import { TherapyPrescription } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";

const createTherapyPrescriptionHandler = async (body) => {
  const { therapyDescription, medicalEventId } = body;
  try {
    const newTherapy = await TherapyPrescription.create({
      therapyDescription: therapyDescription,
      timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
      medicalEvent: medicalEventId,
    });
    return newTherapy;
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de remisión. ",
      500
    );
  }
};

export default createTherapyPrescriptionHandler;
