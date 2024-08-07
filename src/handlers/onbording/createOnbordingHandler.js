import { SociodemographicDetails } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import { validationOnbording } from "../../validations/validationOnbording.js";

export const createOrUpdateOnboardingHandler = async (body, userId) => {
  if (!validationOnbording(body)) {
    throw new SegimedAPIError(400, "Error en la validación de datos");
  }

  const convertUserId = parseInt(userId, 10);
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
    const newEntry = await SociodemographicDetails.upsert({
      hipertPulm,
      centerAttention,
      liveAlone,
      address,
      genre,
      birthDate,
      hasTechUseDifficulty,
      needsCellphoneAssistance,
      patient: convertUserId,
    }, {
      where: { patient: convertUserId }
    });

    return newEntry;
  } catch (error) {
    console.log(error);

    throw new SegimedAPIError(
      500,
      "Error en la operación de registro: ",
      error
    );
  }
};

export default createOrUpdateOnboardingHandler;
