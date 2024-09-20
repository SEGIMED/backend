import { sequelize } from "../../../databaseConfig.js";
import patchPatientPainMapHandler from "../../painMap/patchPatientPainMapHandler.js";
import updateOrCreateVitalSignsHandler from "../../vitalSigns/updateVitalSignsHandler.js";

const patchProvisionalPreConsultationHandler = async ({
  id,
  vitalSigns,
  painMap,
}) => {
  const transaction = await sequelize.transaction();
  try {
    console.log("#adsads")
    const vitalSignsResponse = await updateOrCreateVitalSignsHandler({
      id,
      vitalSigns,
      transaction,
    });
    console.log("#adsadsjkji")
    const painMapResponse = await patchPatientPainMapHandler({
      id,
      painMap,
      transaction,
    });
    console.log("#adsads156")
    await transaction.commit();
    return { vitalSignsResponse, painMapResponse };
  } catch (error) {
    await transaction.rollback();
    throw new Error("Error actualizando la preconsulta: " + error.message);
  }
};

export default patchProvisionalPreConsultationHandler;
