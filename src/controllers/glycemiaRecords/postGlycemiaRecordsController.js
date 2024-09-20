import { sequelize } from "../../databaseConfig.js";
import postGlycemiaRecordsHandler from "../../handlers/glycemiaRecords/postGlycemiaRecordsHandler.js";

const postGlycemiaRecordsController = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.query;
    const { glycemia, abnormalGlycemia } = req.body;
    const data = await postGlycemiaRecordsHandler({
      glycemia,
      medicalEvent: id,
      abnormalGlycemia,
      transaction,
    });
    await transaction.commit();
    return res.status(201).json(data);
  } catch (error) {
    await transaction.rollback();
    return res.status(500).send(error.message);
  }
};

export default postGlycemiaRecordsController;
