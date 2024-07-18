import { SociodemographicDetails } from "../../databaseConfig";

export const createOnbordingHandler = async (body) => {
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
};
export default createOnbordingHandler;
