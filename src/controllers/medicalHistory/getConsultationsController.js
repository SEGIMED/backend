import getConsultationHandler from "../../handlers/medicalHistory/getConsultationHandler.js";

const getConsultationController = async (req, res) => {
  try {
    const { patientId, physicianId } = req.query;
    console.log(patientId);

    const consultations = await getConsultationHandler(patientId, physicianId);

    return res.status(200).json(consultations);
  } catch (error) {
    throw new Error("Hubo un error al recuperar las consultas: " + error);
  }
};

export default getConsultationController;
