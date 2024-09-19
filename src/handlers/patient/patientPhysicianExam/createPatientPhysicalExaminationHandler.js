import models from "../../../databaseConfig.js";

const newPhysicalExaminationHandler = async ({
  id,
  appointmentSchedule,
  physicalExamination,
}) => {
  const { physicalSubsystemId, description } = physicalExamination;
  try {
    const [physicalExam, created] =
      await models.PatientPhysicalExamination.findOrCreate({
        where: {
          medicalEvent: id,
        },
        defaults: {
          description,
          physicalSubsystem: physicalSubsystemId,
          appointmentScheduling: appointmentSchedule.id,
        },
      });
    if (!created) {
      await physicalExam.update({
        description,
        physicalSubsystem: physicalSubsystemId,
      });
    }
    return true;
  } catch (error) {
    throw new Error("Hubo un error durante el proceso." + error.message);
  }
};

export default newPhysicalExaminationHandler;
