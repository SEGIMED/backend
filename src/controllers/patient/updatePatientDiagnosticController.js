import updatePatientDiagnosticHandler from "../../handlers/patient/updatePatientDiagnosticHandler.js";


const updatePatientDiagnosticController = async (req, res) => {
    try {
        const updatedDiagnostic = req.body;
        const diagnostic = await updatePatientDiagnosticHandler(updatedDiagnostic);
        return res.status(200).json(diagnostic);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updatePatientDiagnosticController;