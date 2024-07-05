import createPatientDiagnosticHandler from "../../handlers/patient/createPatientDiagnostic.js";


const createPatientDiagnosticController = async (req, res) => {
    try {
        const newDiagnostic = req.body;
        const diagnostic = await createPatientDiagnosticHandler(newDiagnostic);
        return res.status(200).json(diagnostic);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createPatientDiagnosticController;