import { Backgrounds } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import { cleanBody } from "../../validations/validationBackground.js";

const updateBackgroundsHandler = async (id, body) => {
  if (!id) {
    throw new SegimedAPIError("El id es requerido.", 400);
  }
  // validamos el body para limpiar los null y undefined
  const validateBody = cleanBody(body);

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
