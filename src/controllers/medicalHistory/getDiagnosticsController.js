import getDiagnosticHandler from "../../handlers/medicalHistory/getDiagnosticsHandler.js";

const getDiagnosticController = async (req, res) => {
  try {
    const { patientId } = req.query;
    const data = await getDiagnosticHandler(patientId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export default getDiagnosticController;
