import models from "../../databaseConfig.js";
const regexPositiveNumbers = /^[1-9][0-9]*$/;
const noSpecialCharsNoNumbersRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const postPatientHandler = async (body) => {
  const {
    idNumber,
    idType,
    name,
    lastname,
    role,
    cellphone,
    email,
  } = body;

  if (!regexPositiveNumbers.test(idNumber)) {
    throw new Error("The idNumber must be a positive integer");
  }
  if (!regexPositiveNumbers.test(idType)) {
    throw new Error("The idType must be a positive integer");
  }
  if (!noSpecialCharsNoNumbersRegex.test(name)) {
    throw new Error(
      "The name must not contain any special characters or numbers."
    );
  }
  if (!noSpecialCharsNoNumbersRegex.test(lastname)) {
    throw new Error(
      "The name must not contain any special characters or numbers."
    );
  }
  if (role === "" || !role) {
    throw new Error("A role must be selected");
  }
  if (!regexPositiveNumbers.test(cellphone)) {
    throw new Error("The cellphone must be a positive integer");
  }
  if (!emailRegex.test(email)) {
    throw new Error("An email is required");
  }

  try {
    const patient = await models.User.create({
      idNumber,
      idType,
      name,
      lastname,
      role,
      cellphone,
      email,
      geolocation,
      avatar,
    });

    return "The user has been successfully created", patient;
  } catch (error) {
    throw new Error("There was an error creating the user: " + error.message);
  }
};

export default postPatientHandler;
