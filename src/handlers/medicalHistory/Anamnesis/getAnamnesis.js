import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import universalPaginationHandler from "../../Pagination/universalPaginationHandler.js";

const getAnamnesisHandler = async (patientId, page, limit) => {
  try {
    const response = await models.MedicalEvent.findAll({
      attributes: [
        "id",
        "historyOfPresentIllness",
        "reviewOfSystems",
      ],
      include: [
        {
          model: models.AppointmentScheduling,
          as: "appSch",
          where: { patient: patientId, schedulingStatus: 2 },
          attributes: ["patient", "scheduledStartTimestamp", "reasonForConsultation"],
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
      ],
    });
    if (!response) {
      throw new SegimedAPIError("Anamnesis not found");
    }
    if (page && limit) {
      const paginated = universalPaginationHandler(response, page, limit);
      return paginated;
    }
    // return only the properties that are not null
    return response;
  } catch (error) {
    throw new SegimedAPIError("Error fetching anamnesis", error.message);
  }
};

export default getAnamnesisHandler;
