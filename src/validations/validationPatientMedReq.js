import SegimedAPIError from "../error/SegimedAPIError.js";

export const validationPatientMedReq = (body) => {
 if (!body.physicianId) {
  throw new SegimedAPIError('Physician ID is required');
 }
 if (typeof body.physicianId !== 'number') {
  throw new SegimedAPIError('Physician ID must be a number');
 }
 if (body.reqTypes === undefined) {
  throw new SegimedAPIError('Request Type is required');
 }
 if (typeof body.reqTypes !== 'string') {
  throw new SegimedAPIError('Request Type must be a string');
 }
 return true;
}