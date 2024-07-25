import { SociodemographicDetails } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

export const createOnbordingHandler = async (body) => {
  try {
    const {
      userId,
      hipertPulm,
      centerAttention,
      liveAlone,
      hasTechUseDifficulty,
      needsCellphoneAssistance,
    } = body;
    const data = await SociodemographicDetails.update(
      {
        hipertPulm,
        centerAttention,
        liveAlone,
        hasTechUseDifficulty,
        needsCellphoneAssistance,
      },
      {
        where: {
          patient: userId,
        },
      }
    );
    return data;
  } catch (error) {
    throw new SegimedAPIError(
      "Error en la operacion de registro: ",
      error,
      500
    );
  }
};
export default createOnbordingHandler;
