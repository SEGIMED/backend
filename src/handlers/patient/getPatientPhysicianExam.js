import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getPatientPhysicalExamination = async (patientId, page, limit) => {
  try {
    const response = await models.MedicalEvent.findAll({
      attributes: [
        "id",
        "chiefComplaint",
        "historyOfPresentIllness",
        "reviewOfSystems",
      ],
      include: [
        {
          model: models.AppointmentScheduling,
          as: "appSch",
          where: { patient: patientId, schedulingStatus: 2 },
          attributes: ["patient", "scheduledStartTimestamp"],
          include: [
            {
              model: models.User,
              as: "physicianThatAttend",
              attributes: ["id", "name", "lastname"],
            },
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
          ],
        },
      ],
    });
    if (!response) {
      throw new SegimedAPIError("PatientExam not found");
    }
    if (page && limit) {
      const paginated = universalPaginationHandler(response, page, limit);
      return paginated;
    }
    // return only the properties that are not null
    return response;
  } catch (error) {
    throw new SegimedAPIError("Error fetching patientExam", error.message);
  }
};

export default getPatientPhysicalExamination;
