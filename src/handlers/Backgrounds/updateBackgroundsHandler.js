import { Backgrounds } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import {
  cleanBody,
  validateBackground,
} from "../../validations/validationBackground.js";

const updateBackgroundsHandler = async (id, body) => {
  if (!id) {
    throw new SegimedAPIError("El id es requerido.", 400);
  }
  const validateBody = cleanBody(body);
  validateBackground(validateBody);
  // se pude modificar todos los campos exepto el id
  try {
    const updatedBackground = await Backgrounds.update(validateBody, {
      where: {
        id: id,
      },
      returning: true,
      plain: true,
    });
    return updatedBackground[1];
  } catch (error) {
    throw new SegimedAPIError("Hubo un error durante el proceso.", 500);
  }
};

export default updateBackgroundsHandler;
