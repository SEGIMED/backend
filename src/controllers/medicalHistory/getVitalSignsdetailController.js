import getVitalSignsDetailHandler from "../../handlers/medicalHistory/getVitalSignsDetailHandler.js";

const getVitalSignsDetailController = async (req, res) => {
  try {
    const eventId = req.query.eventId;
    const isMedicalEvent = req.query.isMedicalEvent;

    if (!eventId) {
      return res.status(400).json({ error: "Se requiere un envento válido." });
    }

    const data = await getVitalSignsDetailHandler(eventId, isMedicalEvent);
    res.json(data);
  } catch (error) {
    console.error("Error al obtener signos vitales:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export default getVitalSignsDetailController;
