import createMedicalProcedurePrescriptionHandler from "../../handlers/medicalProcedurePrescription/createMedicalProcedurePrescriptionHandler.js";

const createMedicalProcedurePrescriptionController = async (req, res) => {
  try {
    const newProcedure = req.body;
    const procedure = await createMedicalProcedurePrescriptionHandler(
      newProcedure
    );
    return res.status(200).json(procedure);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default createMedicalProcedurePrescriptionController;
