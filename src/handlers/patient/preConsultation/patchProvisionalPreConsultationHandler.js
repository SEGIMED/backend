import patchPreconsultationHandler from "../../../controllers/patient/preConsultation/extra/patchPreconsultationHandler.js";
import {
  sequelize,
} from "../../../databaseConfig.js";
import postGlycemiaRecordsHandler from "../../glycemiaRecords/postGlycemiaRecordsHandler.js";
import patchPatientPainMapHandler from "../../painMap/patchPatientPainMapHandler.js";
import updateOrCreateVitalSignsHandler from "../../vitalSigns/updateVitalSignsHandler.js";

const patchProvisionalPreConsultationHandler = async ({
  id,
  vitalSigns,
  painMap,
  preconsultation,
  glycemia,
}) => {
  const transaction = await sequelize.transaction();
  try {
    let vitalSignsResponse;
    let painMapResponse;
    let preConsultationResponse;
    let glycemiaResponse;

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
        preconsultation: {...preconsultation, physicalExamination:painMapResponse.id },
        transaction,
      });
    }

    if (glycemia) {
      glycemiaResponse = await postGlycemiaRecordsHandler({
        glycemia,
        medicalEvent: id,
        abnormalGlycemia: preconsultation?.abnormalGlycemia,
        transaction,
      });
    }

    await transaction.commit();
    return {
      vitalSignsResponse,
      painMapResponse: painMapResponse.response,
      preConsultationResponse,
      glycemiaResponse,
    };
  } catch (error) {
    console.log(error)
    await transaction.rollback();
    throw new Error("Error actualizando la preconsulta: " + error.message);
  }
};

export default patchProvisionalPreConsultationHandler;
