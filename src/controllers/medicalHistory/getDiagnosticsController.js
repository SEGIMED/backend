import getDiagnosticHandler from "../../handlers/medicalHistory/getDiagnosticsHandler.js";

const getDiagnosticController = async (req, res) => {
  try {
    const { patientId, physicianId, medicalSpecialtyId, page, limit } =
      req.query;
    const data = await getDiagnosticHandler({
      patientId,
      physicianId,
      medicalSpecialtyId,
      page,
      limit,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export default getDiagnosticController;
