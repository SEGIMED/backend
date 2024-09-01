import models, { PhysicianAttendancePlace } from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import { transformData } from "../../../utils/transformClinicalHistory.js";
import universalPaginationHandler from "../../Pagination/universalPaginationHandler.js";

const getAnamnesisHandler = async (patientId, page, limit) => {
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
            {
              model: PhysicianAttendancePlace,
              as: "attendancePlace",
              attributes: ["alias"],
            },
          ],
        },
      ],
    });
    const data = response.map((anamnesis) => {
      return {
        timestamp: anamnesis.appSch.scheduledStartTimestamp,
        physician: {
          name: anamnesis.appSch.physicianThatAttend.name,
          lastname: anamnesis.appSch.physicianThatAttend.lastname,
        },
        attendancePlace: anamnesis.appSch.attendancePlace,
        chiefComplaint: anamnesis.chiefComplaint,
        reviewOfSystems: anamnesis.reviewOfSystems,
      };
    });

    if (!response) {
      throw new SegimedAPIError("Anamnesis not found");
    }
    if (page && limit) {
      const paginated = universalPaginationHandler(data, page, limit);
      return paginated;
    }
    // return only the properties that are not null
    return data;
  } catch (error) {
    throw new SegimedAPIError("Error fetching anamnesis", error.message);
  }
};

export default getAnamnesisHandler;
