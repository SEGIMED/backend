import { sequelize } from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const patchConsultationController = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    //TODO agregar los patchhandler de las rutas que se usan en consulta
    //* Funciona en postman
    /*
    /backgrounds/update-backgrounds?id=${userId}//? En revisión
    /patient-update-cardiovascular-risk
    /patient-update-surgical-risk
    /patient-update-hp-group
    /patient-physical-examination?id=${userId}
    /patient-update-hp-risk
    /update-pre-consultation //* patchPatientPainMapHandler, patchProvisionalPreConsultationHandler y updateVitalSignsHandler
    /patient-update-diagnostic
    /medical-event/update-event //* 
    */

  } catch (error) {
    await transaction.rollback();
    if (error instanceof SegimedAPIError) {
      return res.status(error.errorCode).json({ error: error.message });
    } else {
      return res.status(500).json({
        error:
          "Error durante el proceso de actualización de la consulta: " +
          error.message,
      });
    }
  }
};

export default patchConsultationController;
