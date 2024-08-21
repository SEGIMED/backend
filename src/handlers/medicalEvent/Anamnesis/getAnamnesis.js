import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
const getAnamnesisHandler = async (medicalEventId) => {
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
};

export default getAnamnesisHandler;
