import { PatientPhysicalExamination } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const newPhysicalExaminationHandler = async (body) => {
  const { physicalSubsystemId, description, medicalEventId, schedulingId } =
    body;

  try {
    const newPhysicalExamination = await PatientPhysicalExamination.create({
      physicalSubsystem: physicalSubsystemId,
      description,
      medicalEvent: medicalEventId,
      appointmentScheduling: schedulingId ?? null,
    });
    return newPhysicalExamination;
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso." + error.message,
      500
    );
  }
};

export default newPhysicalExaminationHandler;
