import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const getAnamnesisHandler = async (patientId) => {
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
          where: { patient: patientId },
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
      ],
    });
    if (!response) {
      throw new SegimedAPIError("Anamnesis not found");
    }
    // return only the properties that are not null
    return response;
  } catch (error) {
    throw new SegimedAPIError("Error fetching anamnesis", error.message);
  }
};

export default getAnamnesisHandler;
