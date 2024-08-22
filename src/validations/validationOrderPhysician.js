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
  if (!body.medicalPrescriptionId) {
    throw new SegimedAPIError("Medical Prescription ID is required");
  }
  if (typeof body.medicalPrescriptionId !== "number") {
    throw new SegimedAPIError("Medical Prescription ID must be a number");
  }
  if (!body.prescription_modifications_hist_id) {
    throw new SegimedAPIError(
      "Prescription Modifications History ID is required"
    );
  }
  if (typeof body.prescription_modifications_hist_id !== "number") {
    throw new SegimedAPIError(
      "Prescription Modifications History ID must be a number"
    );
  }
  if (!body.indications) {
    throw new SegimedAPIError("Indications are required");
  }
  if (typeof body.indications !== "string") {
    throw new SegimedAPIError("Indications must be a string");
  }
  if (!body.diagnostic) {
    throw new SegimedAPIError("Diagnostic is required");
  }
  if (typeof body.diagnostic !== "string") {
    throw new SegimedAPIError("Diagnostic must be a string");
  }
  if (typeof body.additionalText !== "string") {
    throw new SegimedAPIError("Additional Text must be a string");
  }
  if (!body.date) {
    throw new SegimedAPIError("Date is required");
  }
  if (typeof body.date !== "string") {
    throw new SegimedAPIError("Date must be a string");
  }
  return true;
};

// Function to validate the request type
export function validationReqTypes(orderTypes) {
  const reqTypesValidation = arrayOrderTypes.includes(orderTypes);
  if (!reqTypesValidation) {
    throw new SegimedAPIError("Invalid Request Type");
  }
}
