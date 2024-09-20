import { sequelize } from "../../databaseConfig.js";
import updateOrCreateVitalSignsHandler from "../../handlers/vitalSigns/updateVitalSignsHandler.js";

const createVitalSignsController = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { vitalSigns, painRecords } = req.body;
    const { id } = req.query;
    const vitalSing = await updateOrCreateVitalSignsHandler({
      id,
      vitalSigns,
      transaction,
    });
    await transaction.commit();
    return res.status(200).json(vitalSing);
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ error: error.message });
  }
};

export default createVitalSignsController;
