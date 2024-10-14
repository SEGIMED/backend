import patchPreconsultationHandler from "../../../controllers/patient/preConsultation/extra/patchPreconsultationHandler.js";
import {
  AppointmentScheduling,
  MedicalEvent,
  ProvisionalPreConsultation,
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
  const event = await ProvisionalPreConsultation.findByPk(id, {
    include: {
      model: AppointmentScheduling,
      as: "appointmentScheduleDetails",
      include: {
        model: MedicalEvent,
        as: "medicalEvent",
      },
    },
  });
  if (!event) throw new Error("Ocurrió un error al encontrar la consulta");
  const medicalEventId = event?.appointmentScheduleDetails?.medicalEvent?.id;
  console.log()
  const transaction = await sequelize.transaction();
  try {
    let vitalSignsResponse;
    let painMapResponse;
    let preConsultationResponse;
    let glycemiaResponse;

    if (vitalSigns) {
      vitalSignsResponse = await updateOrCreateVitalSignsHandler({
        id: medicalEventId,
        vitalSigns,
        transaction,
      });
    }

    if (painMap) {
      painMapResponse = await patchPatientPainMapHandler({
        id: medicalEventId,
        painMap,
        transaction,
      });
    }

    if (preconsultation) {
      preConsultationResponse = await patchPreconsultationHandler({
        id: medicalEventId,
        preconsultation,
        transaction,
      });
    }

    if (glycemia) {
      glycemiaResponse = await postGlycemiaRecordsHandler({
        glycemia,
        medicalEvent: medicalEventId,
        abnormalGlycemia: preconsultation?.abnormalGlycemia,
        transaction,
      });
    }

    await transaction.commit();
    return { vitalSignsResponse, painMapResponse, preConsultationResponse, glycemiaResponse };
  } catch (error) {
    await transaction.rollback();
    throw new Error("Error actualizando la preconsulta: " + error.message);
  }
};

export default patchProvisionalPreConsultationHandler;
