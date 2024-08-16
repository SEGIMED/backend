import SegimedAPIError from "../error/SegimedAPIError.js";

// array con los tipos de solicitudes médicas
const arrayReqTypes = [
  "Receta médica",
  "Resumen de historia clínica",
  "Autorización de medicamentos",
  "Autorización de estudios",
  "Aptos físicos",
  "Incapacidades",
  "Certificados",
  "Otro",
];

export const validationPatientMedReq = (body) => {
  if (!body.physicianId) {
    throw new SegimedAPIError("Physician ID is required");
  }
  if (typeof body.physicianId !== "number") {
    throw new SegimedAPIError("Physician ID must be a number");
  }
  if (body.reqTypes === undefined) {
    throw new SegimedAPIError("Request Type is required");
  }
  if (typeof body.reqTypes !== "string") {
    throw new SegimedAPIError("Request Type must be a string");
  }
  validationReqTypes(body.reqTypes);
  return true;
};

// Function to validate the request type
function validationReqTypes(reqTypes) {
  const reqTypesValidation = arrayReqTypes.includes(reqTypes);
  if (!reqTypesValidation) {
    throw new SegimedAPIError("Invalid Request Type");
  }
  return true;
}
