import getVitalSignsHandler from "../../handlers/medicalHistory/getVitalSignsHandler.js";

const getVitalSignsController = async (req, res) => {
  try {
    const patientId = req.query.patientId;
    const page = req.query.page;
    const limit = req.query.limit;

    if (!patientId) {
      return res
        .status(400)
        .json({ error: "Se requiere un patientId válido." });
    }

    const data = await getVitalSignsHandler(patientId, page, limit);
    res.json(data);
  } catch (error) {
    console.error("Error al obtener signos vitales:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export default getVitalSignsController;
