import createDiagnosticTestHandler from "../../handlers/diagnosticTest/createDiagnosticTestHandler.js";


const createDiagnosticTestController = async (req, res) => {
    try {
        const newDiagnosticTest = req.body;
        const test = await createDiagnosticTestHandler(newDiagnosticTest);
        return res.status(200).json(test);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createDiagnosticTestController;