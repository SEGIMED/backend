import { sequelize } from "../../../databaseConfig.js";
import findOrCreateCardiovascularRiskHandler from "../../../handlers/patient/patientRisk/findOrCreateCardiovascularRiskHandler.js";

const findOrCreateCardiovascularRiskController = async (req, res) => {
  const { patientId, cardiovascularRiskId } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const cardiovascularRisk = await findOrCreateCardiovascularRiskHandler({
      patientId,
      cardiovascularRiskId,
      transaction,
    });
    await transaction.commit();
    return res.status(200).json(cardiovascularRisk);
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ error: error.message });
  }
};

export default findOrCreateCardiovascularRiskController;
