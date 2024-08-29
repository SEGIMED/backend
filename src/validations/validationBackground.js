import SegimedAPIError from "../error/SegimedAPIError.js";

export const validateBackground = (body) => {
  // hacemos un array de los arreglos que son los campos requeridos
  const requiredField = [
    surgicalBackground,
    pathologicBackground,
    nonPathologicBackground,
    familyBackground,
    pediatricBackground,
    pharmacologicalBackground,
    vaccinationBackground,
    allergicBackground,
  ];
  requiredField.forEach((element) => {
    const value = body[element];
    if (typeof value !== "string")
      throw new SegimedAPIError(`${element} debe ser un string`, 400);
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
