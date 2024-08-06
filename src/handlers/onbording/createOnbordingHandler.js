import { SociodemographicDetails } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import { validationOnbording } from "../../validations/validationOnbording.js";

export const createOnbordingHandler = async (body, userId) => {
  if (!validationOnbording(body)) {
    throw new SegimedAPIError(400, "Error en la validacion de datos");
  }
  const convertUserid = parseInt(userId, 10);
  const {
    hipertPulm,
    centerAttention,
    liveAlone,
    address,
    genre,
    birthDate,
    hasTechUseDifficulty,
    needsCellphoneAssistance,
  } = body;



  try {
    const newEntry = await SociodemographicDetails.create({
      hipertPulm,
      centerAttention,
      liveAlone,
      address,
      genre,
      birthDate,
      hasTechUseDifficulty,
      needsCellphoneAssistance,
      patient: convertUserid,
    });
    return newEntry;
  } catch (error) {
    throw new SegimedAPIError(
      "Error en la operacion de registro: ",
      error,
      500
    );
  }
};
export default createOnbordingHandler;
