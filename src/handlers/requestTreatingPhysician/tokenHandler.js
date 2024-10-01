import models from "../../databaseConfig.js";
import { tokenGenerator } from "../../utils/token/tokenGenerator.js";
import moment from "moment";

const tokenHandler = async ({ id }) => {
  try {
    const onBoarding = await models.PhysicianOnboarding.findOne({
      where: {
        idPhysician: id,
      },
    });
    if (!onBoarding) {
      throw new Error(
        `No se encontró el registro de onboarding para el médico con ID: ${id}`
      );
    }
    const token = await tokenGenerator();
    if (token) {
      onBoarding.token = token;
      onBoarding.tokenExpiresAt = moment().add(5, "minutes").toISOString();
      await onBoarding.save();
      return token;
    } else {
      throw new Error("La función del token falló");
    }
  } catch (error) {
    console.error("Error al generar el token:", error);
    throw new Error("Ocurrió un error al generar el token: " + error.message);
  }
};

export default tokenHandler;
