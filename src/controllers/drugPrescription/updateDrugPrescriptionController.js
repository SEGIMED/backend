import updateDrugPrescriptionHandler from "../../handlers/drugPrescription/updateDrugPrescriptionHandler.js";

const updateDrugPrescriptionController = async (req, res) => {
  try {
    const { prescriptionCreation } = req.body;

    await updateDrugPrescriptionHandler(prescriptionCreation);
    return res.status(200).json("Prescripción actualizada correctamente");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default updateDrugPrescriptionController;
