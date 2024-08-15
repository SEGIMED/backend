import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

export const createRegisterPhysicianOnCenterAtt = async (
  newCenterAttention
) => {
  try {
    const newRegisterPhysicianOnCenterAtt = await models.AttendentPlace.create({
      idPhysician: userId,
      idCenterAttention: newCenterAttention.idCenterAttention,
    });
    return newRegisterPhysicianOnCenterAtt;
  } catch (error) {
    throw new SegimedAPIError(
      500,
      "Error en la operación de registro: ",
      error
    );
  }
};
