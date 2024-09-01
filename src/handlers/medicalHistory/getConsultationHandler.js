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
        attributes: ["scheduledStartTimestamp", "reasonForConsultation", "id"],
        include: [
          {
            model: models.User,
            as: "patientUser",
            attributes: ["id", "name", "lastname"],
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
    const data = sortedConsultations.map((consulta) => {
      return {
        id: consulta.appSch.id,
        timestamp: consulta.appSch.scheduledStartTimestamp,
        patient: consulta.appSch.patientUser,
        htpGroups: consulta.appSch.patientUser.userHpGroups
          .map((item) => item.catHpGroup.name)
          .join(", "),
        attendancePlace: consulta.appSch.attendancePlace,
        chiefComplaint: consulta.appSch.reasonForConsultation,
      };
    });
    if (page && limit) {
      const paginated = universalPaginationHandler(data, page, limit);
      return paginated;
    }

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default getConsultationHandler;
