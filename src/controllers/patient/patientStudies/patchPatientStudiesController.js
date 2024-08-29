import patchPatientStudiesHandler from "../../../handlers/patient/patientStudies/patchPatientStudiesHandler.js";

const patchPatientStudiesController = async (req, res) => {
  try {

    const data = await patchPatientStudiesHandler(req.body);
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default patchPatientStudiesController;
