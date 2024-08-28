import { PatientPhysicalExamination } from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const updatePatientPhysicalExaminationHandler = async (body) => {
  const { id } = body;

  try {
    const updatePhysicalExamination = await PatientPhysicalExamination.update(
      {
        physicalSubsystem: body.physicalSubsystemId,
        description: body.description,
      },
      {
        where: {
          id: id,
        },
        returning: true,
        plain: true,
      }
    );
    return updatePhysicalExamination[1];
  } catch (error) {
    throw new SegimedAPIError("Hubo un error durante el proceso.", 500);
  }
};

export default updatePatientPhysicalExaminationHandler;
