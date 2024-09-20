import postBackgroundTabHandler from "../../medicalEvent/consultationTabs/post/postBackgroundTabHandler.js";

const patchProvisionalPreConsultationHandler = async ({background}) => {
  try {
    const backgroundResponse = await postBackgroundTabHandler({background})
    return;
  } catch (error) {
    throw new Error("Error actualizando la preconsulta: " + error.message);
  }
};

export default patchProvisionalPreConsultationHandler;
