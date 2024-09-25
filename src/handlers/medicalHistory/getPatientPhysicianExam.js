import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import universalPaginationHandler from "../Pagination/universalPaginationHandler.js";

const getPatientPhysicalExamination = async (patientId, page, limit) => {
  try {
    const response = await models.MedicalEvent.findAll({
      attributes: [
        "id",
        "historyOfPresentIllness",
      ],
      include: [
        {
          model: models.AppointmentScheduling,
          as: "appSch",
          where: { patient: patientId, schedulingStatus: 2 },
          attributes: ["scheduledStartTimestamp","reasonForConsultation"],
          include: [
            {
              model: models.PhysicianAttendancePlace,
              as: "attendancePlace",
            },
            {
              model: models.User,
              as: "physicianThatAttend",
              attributes: ["id", "name", "lastname"],
            },
            {
              model: models.PatientPhysicalExamination,
              as: "physicalAppointment",
              attributes: ["description"],
              include: {
                model: models.CatPhysicalSubsystem,
                as: "catPhysicalSubsystem",
                attributes: ["name"],
              },
            },
            {
              model: models.User,
              as: "patientUser",
              attributes: ["id", "name", "lastname"],
              include: 

                {
                  model: models.PatientPulmonaryHypertensionGroup,
                  as: "userHpGroups",
                  attributes: ["id"],
                  include: [
                    {
                      model: models.CatRisk,
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
    throw new Error("Error fetching patientExam: "+ error.message);
  }
};

export default getPatientPhysicalExamination;
