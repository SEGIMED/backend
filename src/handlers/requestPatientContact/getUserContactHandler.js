import models from "../../databaseConfig.js";

const getUserContactHandler = async (id) => {
  try {
    if (!id) {
        throw new Error("The request id is required");
      }
    const userContactRequest = await models.RequestPatientContact.findAll({
      where: {
        id: id,
      },
    });
    if (userContactRequest.length === 0) {
        throw new Error("User contact request not found");
      }
      return userContactRequest;
  } catch (error) {
    throw new Error("Error loading the request: " + error.message);
  }
};

export default getUserContactHandler;
