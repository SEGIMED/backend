import updateMedicalProcedurePrescriptionHandler
    from "../../handlers/medicalProcedurePrescription/updateMedicalProcedurePrescriptionHandler.js";

const updateMedicalProcedurePrescriptionController = async (req, res) => {
    try {
        const updatedProcedure = req.body;
        const procedure = await updateMedicalProcedurePrescriptionHandler(updatedProcedure);
        return res.status(200).json(procedure);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updateMedicalProcedurePrescriptionController;
