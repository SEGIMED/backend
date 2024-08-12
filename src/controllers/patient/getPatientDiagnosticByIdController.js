import getPatientDiagnosticByIdHandler from "../../handlers/patient/getPatientDiagnosticByIdHandler.js";

const getPatientDiagnosticByIdController = async (req, res) => {
  try {
    const { id } = req.query;
    const patientDiagnostic = await getPatientDiagnosticByIdHandler(id);
    return res.status(200).json(patientDiagnostic);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getPatientDiagnosticByIdController;