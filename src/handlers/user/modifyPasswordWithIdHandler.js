import SegimedInputValidationError from "../../error/SegimedInputValidationError.js";
import { User } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import bcrypt from "bcrypt";

const modifyPasswordWithIdHandler = async (body) => {
  inputValidation(body);
  const { idNumber, userPassword, cellphone } = body;
  let databaseUser;
  try {
    databaseUser = await User.findOne({
      where: {
        idNumber: idNumber,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!databaseUser)
      throw new SegimedAuthenticationError(
        "Este usuario no se encuentra registrado"
      );

    if (databaseUser.verified === false) {
      const hashedPassword = await bcrypt.hash(userPassword, 12);
      databaseUser = await User.update(
        {
          password: hashedPassword,
          cellphone: cellphone,
          //TODO send a text message with link to verify or auto-fill when text message arrives
          verified: true,
        },
        { where: { idNumber: idNumber } }
      );
      return databaseUser;
    }
    throw new Error(
      "No es posible cambiar la contraseña. La cuenta ya ha sido verificada"
    );
  } catch (error) {
    console.error(error);
    throw new SegimedAPIError(
      "Hubo un error procesando la solicitud :" + error.message,
      500
    );
  }
};

async function inputValidation(body) {
  const { idNumber, userPassword, cellphone } = body;
  if (!idNumber || !userPassword || !cellphone)
    throw new SegimedInputValidationError("Se deben completar los campos");
}

export default modifyPasswordWithIdHandler;
