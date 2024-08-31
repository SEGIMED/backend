import { SociodemographicDetails } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateSociodemographicDetailsHandler = async (
  patchSociodemographicBody
) => {
  const {
    patientId,
    birthDate,
    genreId,
    educationalLevelId,
    profession,
    civilStatusId,
    address,
    healthCarePlanId,
    healthCareNumber,
    emergencyContactPhone,
    dateOfDeathReport,
    NumberOfFamilyAsistence,
  } = patchSociodemographicBody;

  const updateData = {
    birthDate,
    genreId,
    educationalLevel: educationalLevelId,
    profession,
    civilStatus: civilStatusId,
    address,
    healthCarePlan: healthCarePlanId,
    healthCareNumber,
    emergencyContactPhone,
    dateOfDeathReport,
    NumberOfFamilyAsistence,
  };

  try {
    const result = await Sequelize.transaction(async (t) => {
      const [sociodemographicDetail, created] =
        await SociodemographicDetails.findOrCreate({
          where: { patient: patientId },
          defaults: updateData,
          transaction: t,
        });

      if (!created) {
        await sociodemographicDetail.update(updateData, { transaction: t });
      }

      return sociodemographicDetail;
    });

    return result;
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      throw new SegimedAPIError("Validation error: " + error.message, 400);
    } else {
      throw new SegimedAPIError("Server error: " + error.message, 500);
    }
  }
};

export default updateSociodemographicDetailsHandler;
