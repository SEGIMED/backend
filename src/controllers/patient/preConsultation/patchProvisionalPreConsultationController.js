import patchProvisionalPreConsultationHandler from "../../../handlers/patient/preConsultation/patchProvisionalPreConsultationHandler.js";
import updateVitalSignsHandler from "../../../handlers/vitalSigns/updateVitalSignsHandler.js";
import patchPatientPainMapHandler from "../../../handlers/painMap/patchPatientPainMapHandler.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import { MedicalEvent, sequelize } from "../../../databaseConfig.js";

const patchProvisionalPreConsultationController = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const medicalEvent = await MedicalEvent.findOne({
      where: {
        scheduling: req.body.appointmentSchedule,
      },
      attributes: ["id"],
    });

    if (!medicalEvent) {
      throw new Error("Hay un error en la agenda. Solicite turno nuevamente.");
    }
    req.body.medicalEvent = medicalEvent;

    const updatedPreconsultation = await patchProvisionalPreConsultationHandler(
      req.body,
      { transaction }
    );
    const updatedVitalSigns = await updateVitalSignsHandler(req.body, {
      transaction,
    });

    const updatedPainRecords = await patchPatientPainMapHandler(req.body, {
      transaction,
    });
    await transaction.commit();
    return res
      .status(200)
      .json({ updatedPreconsultation, updatedVitalSigns, updatedPainRecords });
  } catch (error) {
    await transaction.rollback();
    if (error instanceof SegimedAPIError) {
      return res.status(error.errorCode).json({ error: error.message });
    } else {
      return res
        .status(500)
        .json({
          error:
            "Error durante el proceso de actualización de la preconsulta: " +
            error.message,
        });
    }
  }
};

export default patchProvisionalPreConsultationController;
