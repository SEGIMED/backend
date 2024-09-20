import { sequelize } from "../../../databaseConfig.js";
import patchProvisionalPreConsultationHandler from "../../../handlers/patient/preConsultation/patchProvisionalPreConsultationHandler.js";

const patchProvisionalPreConsultationController = async (req, res) => {
  const transaction = await sequelize.transaction();
  const {background} = req.body
  try {
    await transaction.commit();
    const response = await patchProvisionalPreConsultationHandler({background})
    return true;
  } catch (error) {
    await transaction.rollback();

    return res.status(500).json({
      error:
        "Error durante el proceso de actualización de la preconsulta: " +
        error.message,
    });
  }
};

export default patchProvisionalPreConsultationController;
