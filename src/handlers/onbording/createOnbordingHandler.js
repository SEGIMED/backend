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
    await SociodemographicDetails.update(
      {
        hipertPulm,
        centerAttention,
        liveAlone,
        address,
        genre,
        birthDate,
        hasTechUseDifficulty,
        needsCellphoneAssistance,
      },
      {
        where: {
          patient: convertUserid,
        },
      }
    );
    const updateValue = await SociodemographicDetails.findOne({
      where: {
        patient: convertUserid,
      },
    });
    return updateValue;
  } catch (error) {
    throw new SegimedAPIError(
      "Error en la operacion de registro: ",
      error,
      500
    );
  }
};
export default createOnbordingHandler;
