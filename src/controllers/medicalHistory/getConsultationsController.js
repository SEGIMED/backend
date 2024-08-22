import getConsultationHandler from "../../handlers/medicalHistory/getConsultationHandler.js";

const getConsultationController = async (req, res) => {
  try {
    const { patientId, physicianId, page, limit } = req.query;

    const consultations = await getConsultationHandler(
      patientId,
      physicianId,
      page,
      limit
    );

    return res.status(200).json(consultations);
  } catch (error) {
    throw new Error("Hubo un error al recuperar las consultas: " + error);
  }
};

export default getConsultationController;
