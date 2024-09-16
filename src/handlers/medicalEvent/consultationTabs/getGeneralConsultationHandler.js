import getConsultationTabHandler from "./getConsultationTabHandler.js";
import getPreConsultationTabHandler from "./getPreConsultationTabHandler.js";
import getStudiesConsultationTabHandler from "./getStudiesConsultationTabHandler.js";

const getGeneralConsultationHandler = async ({ id }) => {
  try {
    const consultation = await getConsultationTabHandler({ id });
    const preConsultation = await getPreConsultationTabHandler({ id });
    const studies = await getStudiesConsultationTabHandler({ id });
    return {
      consultation,
      preConsultation,
      studies,
    };
  } catch (error) {
    throw new Error(
      "Ocurrió un error al recuperar la consulta: " + error.message
    );
  }
};
export default getGeneralConsultationHandler;
