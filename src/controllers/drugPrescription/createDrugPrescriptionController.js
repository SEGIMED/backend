import { sequelize } from "../../databaseConfig.js";
import { createDrugPrescriptions } from "./drugPrescriptionHelper.js";


 const createDrugPrescriptionController = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const prescriptions = req.body;
    await createDrugPrescriptions(prescriptions, transaction);
    await transaction.commit();
    return res.status(201).json({ message: "Prescripciones creadas con éxito" });
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    return res.status(500).json({ error: error.message });
  }
};

export default createDrugPrescriptionController;