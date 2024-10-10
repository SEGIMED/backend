import models from "../../../databaseConfig.js";

const newPhysicalExaminationHandler = async ({
  id,
  appointmentSchedule,
  physicalExamination,
  transaction,
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
        transaction,
      });
    if (!created) {
      await physicalExam.update(
        {
          description,
          physicalSubsystem: physicalSubsystemId,
        },
        { transaction }
      );
    }
    return true;
  } catch (error) {
    throw new Error("Hubo un error durante el proceso." + error.message);
  }
};

export default newPhysicalExaminationHandler;
