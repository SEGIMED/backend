import { User } from "../../databaseConfig.js";

const regexPositiveNumbers = /^[1-9][0-9]*$/;

const getUserHandler = async (id) => {
  try {
    if (!regexPositiveNumbers.test(id)) {
      throw new Error("El id del usuario debe ser un entero positivo");
    }

    const getUser = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });
    if (!getUser) throw new Error("Usuario no encontrado");
    return getUser;
  } catch (error) {
    throw new Error("Error cargando el usuario: " + error.message);
  }
};

export default getUserHandler;
