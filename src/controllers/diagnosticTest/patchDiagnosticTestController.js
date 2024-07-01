import patchDiagnosticTestHandler from "../../handlers/diagnosticTest/patchDiagnosticTestHandler.js";


const patchDiagnosticTestController = async (req, res) => {
    try {
        const updateDiagnosticTest = req.body;
        const test = await patchDiagnosticTestHandler(updateDiagnosticTest);
        return res.status(200).json(test);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default patchDiagnosticTestController;