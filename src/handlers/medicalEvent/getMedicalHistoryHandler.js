import contextService from "request-context";
import models from "../../databaseConfig.js";
import getGeneralConsultationHandler from "./consultationTabs/get/getGeneralConsultationHandler.js";

const getMedicalHistoryHandler = async ({ userId }) => {
  try {
    const listOfMedicalEvent = await models.MedicalEvent.findAll({
      attributes: ["id"],
      include: {
        model: models.AppointmentScheduling,
        as: "appSch",
        where: {
          patient: userId,
          schedulingStatus: 2,
        },
        attributes: [],
      },
    });
    const getAllData = await Promise.all(
      listOfMedicalEvent.map(async (e) => {
        return await getGeneralConsultationHandler({ id: e.id });
      })
    );

    return getAllData;
  } catch (error) {
    throw new Error(
      "Ocurrió un error al recuperar la historia clínica: " + error.message
    );
  }
};
export default getMedicalHistoryHandler;
