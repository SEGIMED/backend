import models from "../../../databaseConfig.js";

export const deletePatientMedReq = async (medReqId) => {
  try {
    const patientMedReq = await models.PatientMedicalReq.destroy({
      where: { id: medReqId },
    });
    return patientMedReq;
  } catch (error) {
    throw new Error(error);
  }
};

export const deletePatientMdReqForTime = async () => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const patientMedReq = await models.PatientMedicalReq.destroy({
      where: {
        createdAt: {
          [Op.lt]: oneWeekAgo,
        },
      },
    });
    return patientMedReq;
  } catch (error) {
    throw new Error(error);
  }
};
