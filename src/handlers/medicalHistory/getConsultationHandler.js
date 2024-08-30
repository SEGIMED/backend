import models from "../../databaseConfig.js";
import universalPaginationHandler from "../Pagination/universalPaginationHandler.js";

const getConsultationHandler = async (
  patientId,
  physicianId,
  page,
  limit,
  status
) => {
  try {
    if (
      patientId &&
      status !== undefined &&
      parseInt(status) !== 2 &&
      parseInt(status) !== 1
    ) {
      throw new Error("No estas habilitado para ver esta información");
    }

    const filters = {
      schedulingStatus: status || 2, // 2 = atendida
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
          {
            model: models.PhysicianAttendancePlace,
            as: "attendancePlace",
          },
        ],
      },
    });

    // Ordena los resultados por scheduledStartTimestamp en orden descendente
    const sortedConsultations = consultations.sort((a, b) => {
      return (
        new Date(b.appSch.scheduledStartTimestamp) -
        new Date(a.appSch.scheduledStartTimestamp)
      );
    });

    if (page && limit) {
      const paginated = universalPaginationHandler(
        sortedConsultations,
        page,
        limit
      );
      return paginated;
    }

    return sortedConsultations;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default getConsultationHandler;
