import getConsultationHandler from "../../handlers/medicalHistory/getConsultationHandler.js";

const getConsultationController = async (req, res) => {
  try {
    const { patientId, physicianId, page, limit, status } = req.query;

    const consultations = await getConsultationHandler(
      patientId,
      physicianId,
      page,
      limit,
      status
    );

    return res.status(200).json(consultations);
  } catch (error) {
    return res
      .status(500)
      .send("Hubo un error al recuperar las consultas: " + error);
  }
};

export default getConsultationController;
