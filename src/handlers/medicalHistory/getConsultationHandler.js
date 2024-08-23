import models from "../../databaseConfig.js";
import universalPaginationHandler from "../Pagination/universalPaginationHandler.js";

const getConsultationHandler = async (patientId, physicianId, page, limit) => {
  try {
    const filters = {
      schedulingStatus: 2, // 2 = atendida
    };
    if (patientId) {
      filters.patient = patientId;
    }
    if (physicianId) {
      filters.physician = physicianId;
    }
    const consultations = await models.MedicalEvent.findAll({
      attributes: ["id"],
      include: {
        model: models.AppointmentScheduling,
        as: "appSch",
        where: filters,
        attributes: ["scheduledStartTimestamp", "reasonForConsultation"],
        include: [
          {
            model: models.User,
            as: "patientUser",
            attributes: ["id"],
            include: {
              model: models.PatientPulmonaryHypertensionGroup,
              as: "userHpGroups",
              attributes: ["id"],
              include: [
                {
                  model: models.CatPulmonaryHypertensionGroup,
                  as: "catHpGroup",
                  attributes: ["name"],
                },
              ],
            },
          },
        ],
      },
    });

    if (page && limit) {
      const paginated = universalPaginationHandler(consultations, page, limit);
      return paginated;
    }
    return consultations;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default getConsultationHandler;
