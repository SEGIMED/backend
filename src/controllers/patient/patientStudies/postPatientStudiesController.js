import postPatientStudiesHandler from "../../../handlers/patient/patientStudies/postPatientStudiesHandler.js";

const postPatientStudiesController = async (req, res) => {
  try {
    
    const studiesUploaded = await postPatientStudiesHandler(req.body);
    return res.status(201).json(studiesUploaded);
  } catch (error) {
    return res.status(500).json({ "Hubo un error durante el proceso de creación: ": error.message })
  }
};

export default postPatientStudiesController;
