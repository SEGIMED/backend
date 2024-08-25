import { RequestFollow } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

export const getRequestHandler = async () => {
  try {
    const requestFollow = await RequestFollow.findAll();
    return requestFollow;
  } catch (error) {
    throw new SegimedAPIError(
      "Ocurrio un error con la operacion",
      500,
      error.message
    );
  }
};

export const getRequestByIdHandler = async (field, id) => {
  try {
    const requestFollow = await RequestFollow.findAll({
      where: {
        [field]: id,
      },
    });
    return requestFollow;
  } catch (error) {
    throw new SegimedAPIError(
      "Ocurrio un error con la operacion",
      500,
      error.message
    );
  }
};
