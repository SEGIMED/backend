import createPatientDiagnosticHandler from "../../handlers/patient/createPatientDiagnostic.js";
import createDrugPrescriptionHandler from "../../handlers/drugPrescription/createDrugPrescriptionHandler.js";
import createMedicalProcedurePrescriptionHandler from "../../handlers/medicalProcedurePrescription/createMedicalProcedurePrescriptionHandler.js";
import createTherapyPrescriptionHandler from "../../handlers/therapy/createTherapyPrescriptionHandler.js";
import createMedicalIndicationsHandler from "../../handlers/medicalIndications/createMedicalIndicationsHandler.js";

const createPatientDiagnosticController = async (req, res) => {
    try {
        const newDiagnostic = req.body;


        const diagnostic = await createPatientDiagnosticHandler(newDiagnostic);

        const drug = await createDrugPrescriptionHandler(newDiagnostic);

        const procedure = await createMedicalProcedurePrescriptionHandler(newDiagnostic);

        const therapy = await createTherapyPrescriptionHandler(newDiagnostic);

        const newIndication = await createMedicalIndicationsHandler(newDiagnostic);

        return res.status(200).json({ diagnostic, drug, procedure, therapy, newIndication });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export default createPatientDiagnosticController;