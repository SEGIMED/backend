import { SociodemographicDetails } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const updateSociodemographicDetailsHandler = async (
  patchSociodemographicBody
) => {
  try {
    const [updateSociodemographicDetail, created] =
      await SociodemographicDetails.findOrCreate({
        where: {
          patient: patchSociodemographicBody.patientId,
        },
        defaults: {
          birthDate: patchSociodemographicBody.birthDate,
          genre: patchSociodemographicBody.genreId,
          educationalLevel: patchSociodemographicBody.educationalLevelId,
          profession: patchSociodemographicBody.profession,
          civilStatus: patchSociodemographicBody.civilStatusId,
          address: patchSociodemographicBody.address,
          healthCarePlan: patchSociodemographicBody.healthCarePlanId,
          healthCareNumber: patchSociodemographicBody.healthCareNumber,
          emergencyContactPhone:
            patchSociodemographicBody.emergencyContactPhone,
          dateOfDeathReport: patchSociodemographicBody.dateOfDeathReport,
          hiperPulm: patchSociodemographicBody.hiperPulm,
          centerAttention: patchSociodemographicBody.centerAttention,
          liveAlone: patchSociodemographicBody.liveAlone,
          hasTechUseDifficulty: patchSociodemographicBody.hasTechUseDifficulty,
          needsCellphoneAssistance:
            patchSociodemographicBody.needsCellphoneAssistance,
        },
      });

    if (!created) {
      // Si ya existe, actualizar los detalles sociodemográficos
      await updateSociodemographicDetail.update({
        birthDate: patchSociodemographicBody.birthDate,
        genre: patchSociodemographicBody.genreId,
        educationalLevel: patchSociodemographicBody.educationalLevelId,
        profession: patchSociodemographicBody.profession,
        civilStatus: patchSociodemographicBody.civilStatusId,
        address: patchSociodemographicBody.address,
        healthCarePlan: patchSociodemographicBody.healthCarePlanId,
        emergencyContactPhone: patchSociodemographicBody.emergencyContactPhone,
        dateOfDeathReport: patchSociodemographicBody.dateOfDeathReport,
        hiperPulm: patchSociodemographicBody.hiperPulm,
        centerAttention: patchSociodemographicBody.centerAttention,
        liveAlone: patchSociodemographicBody.liveAlone,
        hasTechUseDifficulty: patchSociodemographicBody.hasTechUseDifficulty,
        needsCellphoneAssistance:
          patchSociodemographicBody.needsCellphoneAssistance,
      });
    }

    return updateSociodemographicDetail;
  } catch (error) {
    throw new SegimedAPIError(error, 500);
  }
};

export default updateSociodemographicDetailsHandler;
