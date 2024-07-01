import models from "../../databaseConfig.js";

const getAllUserContactHandler = async () => {
  try {
    const requests = await models.RequestPatientContact.findAll();
    return requests;
  } catch (error) {
    throw new Error("Error loading requests: " + error.message);
  }
};

export default getAllUserContactHandler;
