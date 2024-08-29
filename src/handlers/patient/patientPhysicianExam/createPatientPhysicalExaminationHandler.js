import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const newPhysicalExaminationHandler = async (body) => {
  const { physicalSubsystemId, description, medicalEventId, schedulingId } =
    body;
  let newSchedulingId = schedulingId;
  try {
    if (!schedulingId) {
      const medicalEventRegistered = await models.MedicalEvent.findByPk(
        medicalEventId
      );
      if (!medicalEventRegistered) {
        throw new SegimedAPIError("El evento médico no existe.", 404);
      }
      newSchedulingId = medicalEventRegistered.scheduling;
    }
    const newPhysicalExamination =
      await models.PatientPhysicalExamination.create({
        physicalSubsystem: physicalSubsystemId,
        description,
        medicalEvent: medicalEventId,
        appointmentScheduling: newSchedulingId,
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
