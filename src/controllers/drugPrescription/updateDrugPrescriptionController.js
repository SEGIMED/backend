import updateDrugPrescriptionHandler from "../../handlers/drugPrescription/updateDrugPrescriptionHandler.js";

const updateDrugPrescriptionController = async (req, res) => {
  try {
    const updateDrugPrescription = req.body;
    const drug = await updateDrugPrescriptionHandler(updateDrugPrescription);
    return res.status(200).json(drug);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default updateDrugPrescriptionController;
