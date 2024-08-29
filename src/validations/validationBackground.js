import SegimedAPIError from "../error/SegimedAPIError.js";

export const cleanBody = (body) => {
  return Object.entries(body) // Convierte el objeto en un array de [clave, valor]
    .filter(([key, value]) => value !== null && value !== undefined) // Filtra las entradas que no sean null ni undefined
    .reduce((acc, [key, value]) => {
      acc[key] = value; // Reconstruye el objeto con las entradas filtradas
      return acc;
    }, {});
};
