import patchProvisionalPreConsultationHandler from "../../../handlers/patient/preConsultation/patchProvisionalPreConsultationHandler.js";

const patchProvisionalPreConsultationController = async (req, res) => {
  const { id } = req.query;
  const { vitalSigns, painMap, preconsultation } = req.body;
  try {
    const response = await patchProvisionalPreConsultationHandler({
      id,
      vitalSigns,
      painMap,
      preconsultation,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error:
        "Error durante el proceso de actualización de la preconsulta: " +
        error.message,
    });
  }
};

export default patchProvisionalPreConsultationController;
