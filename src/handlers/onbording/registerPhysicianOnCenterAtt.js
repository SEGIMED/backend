import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

export const createRegisterPhysicianOnCenterAtt = async (
  newCenterAttention
) => {
  try {
    const [newRegister, created] = await newCenterAttention.map(
      async (centerAttention) => {
        await models.AttendentPlace.findOrCreate({
          where: {
            idPhysician: centerAttention.idPhysician,
            idCenterAttention: centerAttention.idCenterAttention,
          },
          defaults: {
            idPhysician: centerAttention.idPhysician,
            idCenterAttention: centerAttention.idCenterAttention,
          },
        });
      }
    );
    return newRegister;
  } catch (error) {
    throw new SegimedAPIError(
      500,
      error.message || "Error al registrar el médico en el centro de atención"
    );
  }
};
