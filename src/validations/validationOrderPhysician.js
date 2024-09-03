import SegimedAPIError from "../error/SegimedAPIError.js";

// array con los tipos de solicitudes médicas
const arrayOrderTypes = [
  "Receta médica",
  "Resumen de historia clínica",
  "Autorización de medicamentos",
  "Autorización de estudios",
  "Aptos físicos",
  "Incapacidades",
  "Certificados",
  "Otro",
];

export const validationBodyOrderPhysician = (body) => {
  if (!body.patientId) {
    throw new SegimedAPIError("Patient ID is required");
  }
  if (typeof body.patientId !== "number") {
    throw new SegimedAPIError("Patient ID must be a number");
  }
  if (!body.orderTypes) {
    throw new SegimedAPIError("Request Type is required");
  }
  if (typeof body.orderTypes !== "string") {
    throw new SegimedAPIError("Request Type must be a string");
  }
  validationReqTypes(body.orderTypes);
  return true;
};

// Function to validate the request type
export function validationReqTypes(orderTypes) {
  const reqTypesValidation = arrayOrderTypes.includes(orderTypes);
  if (!reqTypesValidation) {
    throw new SegimedAPIError("Invalid Request Type");
  }
}
