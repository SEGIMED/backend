import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

export const getPatientPhysicalExamination = async (medialEventId) => {
  const { PatientPhysicalExamination } = models;
  try {
    const exams = await PatientPhysicalExamination.findAll({
      where: {
        medicalEvent: medialEventId,
      },
    });
    return exams;
  } catch (error) {
    console.error(error);
    throw new SegimedAPIError(
      "Hubo un error durante el proceso: ",
      error.message
    );
  }
};
