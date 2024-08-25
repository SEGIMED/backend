import models from "../../databaseConfig.js";

const regexPositiveNumbers = /^[1-9][0-9]*$/;

const deletePatientHandler = async (id) => {
  if (!regexPositiveNumbers.test(id)) {
    throw new Error("The user id must be a positive integer");
  }
  try {
    const userToDelete = await models.User.findByPk(id);
    await userToDelete.update({
      verified: false,
    });
    return "User successfully removed";
  } catch (error) {
    throw new Error("There was a problem deleting the user " + error.message);
  }
};

export default deletePatientHandler;
