import { SociodemographicDetails } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

export const createOnbordingHandler = async (body, userId) => {
  const convertUserid = parseInt(userId);
  try {
    const {
      birthDate, // date
      address, // string
      genre, // Integer
      hipertPulm, // boolean
      centerAttention, // bigint
      liveAlone, // boolean
      hasTechUseDifficulty, // boolean
      needsCellphoneAssistance, // boolean
    } = body;
    const data = await SociodemographicDetails.update(
      {
        birthDate,
        address,
        genre,
        hipertPulm,
        centerAttention,
        liveAlone,
        hasTechUseDifficulty,
        needsCellphoneAssistance,
      },
      {
        where: {
          patient: convertUserid,
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
