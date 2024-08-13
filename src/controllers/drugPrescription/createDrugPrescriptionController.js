import { sequelize } from "../../databaseConfig.js";
import createDrugPrescriptionHandler from "../../handlers/drugPrescription/createDrugPrescriptionHandler.js";
import drugCreationHandler from "../../handlers/drugPrescription/drugCreationHandler.js";

const createDrugPrescriptionController = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { drugDetailPresentationId, drugCreation, prescriptionCreation } =
      req.body;
    let drugDetailId = drugDetailPresentationId;
    if (!drugDetailId) {
      const createdDrugDetail = await drugCreationHandler(
        drugCreation,
        transaction
      );
      drugDetailId = createdDrugDetail.id;
    }
    const newPrescription = await createDrugPrescriptionHandler(
      {
        ...prescriptionCreation,
        drugDetailPresentationId: drugDetailId,
      },
      transaction
    );
    await transaction.commit();
    return res.status(201).json(newPrescription);
  } catch (error) {
    console.log(error)
    if (transaction) {
      await transaction.rollback();
    }

    return res.status(500).json({ error: error.message });
  }
};

export default createDrugPrescriptionController;
