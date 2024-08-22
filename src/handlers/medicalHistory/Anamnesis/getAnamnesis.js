import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const getAnamnesisHandler = async (userId) => {
  try {
    const response = await models.MedicalEvent.findAll({
      attributes: [
        "chiefComplaint",
        "historyOfPresentIllness",
        "reviewOfSystems",
      ],
      include: [
        {
          model: models.AppointmentScheduling,
          as: "appSch",
          attributes: [
            "patient",
            "scheduledStartTimestamp",
            "scheduledEndTimestamp",
            "actualEndTimestamp",
            "actualStartTimestamp",
          ],
          where: {
            patient: userId,
          },
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
