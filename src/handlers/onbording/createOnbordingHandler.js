import { SociodemographicDetails } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import { updateValueModel } from "../../validations/updatePreconsutation.js";
import { validationOnbording } from "../../validations/validationOnbording.js";

export const createOnboardingHandler = async (body, userId) => {
  const convertUserid = parseInt(userId, 10);
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
  if (!validationOnbording(body)) {
    throw new SegimedAPIError("Error en la validacion de datos", 400);
  }
  try {
    const updateData = await SociodemographicDetails.update(
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
    return updateData;
  } catch (error) {
    throw new SegimedAPIError(
      "Error en la operacion de registro: ",
      error,
      500
    );
  }
};
export default createOnboardingHandler;
