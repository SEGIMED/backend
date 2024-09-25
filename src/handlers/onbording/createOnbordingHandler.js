import { SociodemographicDetails } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import { validationOnbording } from "../../validations/validationOnbording.js";

export const createOnbordingHandler = async (body, userId) => {
  if (!validationOnbording(body)) {
    throw new SegimedAPIError(400, "Error en la validación de datos");
  }
  const {
    hipertPulm,
    centerAttention,
    liveAlone,
    address,
    genre,
    birthDate,
    hasTechUseDifficulty,
    needsCellphoneAssistance,
    numberOfFamilyAsistencePrefix,
    numberOfFamilyAsistence,
  } = body;

  try {
    const [newEntry] = await SociodemographicDetails.findOrCreate({
      where: { patient: userId },
      defaults: {
        hipertPulm,
        centerAttention,
        liveAlone,
        address,
        genre,
        birthDate,
        hasTechUseDifficulty,
        needsCellphoneAssistance,
        patient: userId,
        numberOfFamilyAsistencePrefix,
        numberOfFamilyAsistence,
      },
    });

    return newEntry;
  } catch (error) {
    throw new SegimedAPIError(
      500,
      "Error en la operación de registro: ",
      error
    );
  }
};

export default createOnbordingHandler;
