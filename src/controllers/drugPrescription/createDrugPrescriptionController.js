import { sequelize } from "../../databaseConfig.js";
import createDrugPrescriptionHandler from "../../handlers/drugPrescription/createDrugPrescriptionHandler.js";
import drugCreationHandler from "../../handlers/drugPrescription/drugCreationHandler.js";
import validateDrugCreationData from "../../validations/validateDrugCreation.js";
import { validateDrugPrescriptionInput } from "../../validations/validateDrugPrescriptionInput.js";

const createDrugPrescriptionController = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    validateDrugPrescriptionInput(req.body);
    validateDrugCreationData(req.body.drugCreation);

    const { drugDetailPresentationId,commercialNameDrugId, drugCreation, prescriptionCreation } =
      req.body;
    let drugDetailId = drugDetailPresentationId;
    if (!drugDetailId) {
      const createdDrugDetail = await drugCreationHandler(
        drugCreation,
        transaction
      );
      drugDetailId = createdDrugDetail.id;
      commercialNameDrugId =createdDrugDetail.commercialNameDrugId
    }
    const newPrescription = await createDrugPrescriptionHandler(
      {
        ...prescriptionCreation,
        drugDetailPresentationId: drugDetailId,
        commercialNameDrugId
      },
      transaction
    );
    await transaction.commit();
    return res.status(201).json("Prescripción creada con éxito");
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }

    return res.status(500).json({ error: error.message });
  }
};

export default createDrugPrescriptionController;
