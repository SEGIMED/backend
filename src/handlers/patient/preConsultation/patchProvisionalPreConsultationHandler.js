import patchPreconsultationHandler from "../../../controllers/patient/preConsultation/extra/patchPreconsultationHandler.js";
import { sequelize } from "../../../databaseConfig.js";
import patchPatientPainMapHandler from "../../painMap/patchPatientPainMapHandler.js";
import updateOrCreateVitalSignsHandler from "../../vitalSigns/updateVitalSignsHandler.js";

const patchProvisionalPreConsultationHandler = async ({
  id,
  vitalSigns,
  painMap,
  preconsultation,
}) => {
  const transaction = await sequelize.transaction();
  try {
    let vitalSignsResponse;
    let painMapResponse;
    let preConsultationResponse;

    if (vitalSigns) {
      vitalSignsResponse = await updateOrCreateVitalSignsHandler({
        id,
        vitalSigns,
        transaction,
      });
    }

    if (painMap) {
      painMapResponse = await patchPatientPainMapHandler({
        id,
        painMap,
        transaction,
      });
    }

    if (preconsultation) {
      preConsultationResponse = await patchPreconsultationHandler({
        id,
        preconsultation,
        transaction,
      });
    }

    await transaction.commit();
    return { vitalSignsResponse, painMapResponse, preConsultationResponse };
  } catch (error) {
    await transaction.rollback();
    throw new Error("Error actualizando la preconsulta: " + error.message);
  }
};

export default patchProvisionalPreConsultationHandler;
