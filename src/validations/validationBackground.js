import SegimedAPIError from "../error/SegimedAPIError.js";

export const validateBackground = (body) => {
  const {
    surgicalBackground,
    pathologicBackground,
    nonPathologicBackground,
    familyBackground,
    pediatricBackground,
    pharmacologicalBackground,
    vaccinationBackground,
    allergicBackground,
  } = body;
  const arrayString = [
    surgicalBackground,
    pathologicBackground,
    nonPathologicBackground,
    familyBackground,
    pediatricBackground,
    pharmacologicalBackground,
    vaccinationBackground,
    allergicBackground,
  ];
  arrayString.forEach((element) => {
    if (typeof element !== "string") {
      throw new SegimedAPIError(`El campo ${element} debe ser un string`, 400);
    }
  });
};
export const cleanBody = (body) => {
  return Object.entries(body) // Convierte el objeto en un array de [clave, valor]
    .filter(([key, value]) => value !== null && value !== undefined) // Filtra las entradas que no sean null ni undefined
    .reduce((acc, [key, value]) => {
      acc[key] = value; // Reconstruye el objeto con las entradas filtradas
      return acc;
    }, {});
};
