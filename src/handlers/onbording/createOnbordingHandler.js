import { SociodemographicDetails } from "../../databaseConfig.js";
import { validationOnbording } from "../../validations/validationOnbording.js";

export const createOnbordingHandler = async (body, userId) => {
  const validation = validationOnbording(body);
  if (!validation.valid) {
    throw new Error(
      "Error en la validación de datos: " + validation.errors.join(", ")
    );
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
    const [newEntry, created] = await SociodemographicDetails.findOrCreate({
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

    if (!created) {
      await newEntry.update({
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
      });
    }

    return newEntry;
  } catch (error) {
    throw new Error("Error en la operación de registro: " + error.message);
  }
};

export default createOnbordingHandler;
