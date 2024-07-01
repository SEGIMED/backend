import models from "../../databaseConfig.js";

const postUserContactHandler = async (body) => {
  const { requestingUserId, title, content } = body;

  try {
    const validate = validateInformation(requestingUserId, title, content);

    if (validate === false) {
      throw new Error("Uncomplete information");
    } else {
      const createdRequest = await models.RequestPatientContact.create({
        requestingUserId,
        title,
        content,
      });
      return "The request has been successfully created", createdRequest;
    }
  } catch (error) {
    throw new Error(
      "There was an error creating the request: " + error.message
    );
  }
};

const validateInformation = (requestingUserId, title, content) => {
  if (!requestingUserId || !title || !content) {
    return false;
  }
};
export default postUserContactHandler;
