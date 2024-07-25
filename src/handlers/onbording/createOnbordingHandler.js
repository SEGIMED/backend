import { SociodemographicDetails } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

export const createOnbordingHandler = async (body) => {
  try {
    const {
      userId,
      hipertPulm, //  hipertension pulmonar
      centerAttention, // centro de atencion
      liveAlone, // vive solo
      hasTechUseDifficulty, // tiene dificultad en el uso de tecn
      needsCellphoneAssistance, // necesita asistencia de celular
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
