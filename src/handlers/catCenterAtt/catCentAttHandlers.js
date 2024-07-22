import { CatCenterAttention } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

// function to create a center of attention
export const createCatCenterAttHandler = async (body) => {
  try {
    const { name, address, phone, email, city } = body;
    const data = await CatCenterAttention.create({
      name,
      address,
      phone,
      email,
      city,
    });
    return data;
  } catch (error) {
    throw new SegimedAPIError(
      "Error en la operacion de registro: ",
      error,
      500
    );
  }
};

// function to get all centers of attention
export const getAllCatCenterAttHandler = async () => {
  try {
    const data = await CatCenterAttention.findAll();
    return data;
  } catch (error) {
    throw new SegimedAPIError(
      "Error en la operacion de recoleccion: ",
      error,
      500
    );
  }
};

// function to update center attention
export const updateCatCenterAttHandler = async (body) => {
  try {
    const { id, name, address, phone, email, city } = body;
    const data = await CatCenterAttention.update(
      {
        name,
        address,
        phone,
        email,
        city,
      },
      {
        where: {
          id,
        },
      }
    );
    return data;
  } catch (error) {
    throw new SegimedAPIError(
      "Error en la operacion de actualizacion: ",
      error,
      500
    );
  }
};
