import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const getAnamnesisHandler = async (medicalEventId) => {
  try {
    const response = await models.MedicalEvent.findOne({
      where: {
        id: medicalEventId,
      },
      attributes: [
        "chiefComplaint",
        "historyOfPresentIllness",
        "reviewOfSystems",
      ],
    });
    if (!response) {
      throw new SegimedAPIError("Anamnesis not found");
    }
    // return only the properties that are not null
    return Object.keys(response.dataValues).reduce((acc, key) => {
      acc[key] = response[key] ? response[key] : "Property not found";
      return acc;
    }, {});
  } catch (error) {
    throw new SegimedAPIError("Error fetching anamnesis", error.message);
  }
};

export default getAnamnesisHandler;
