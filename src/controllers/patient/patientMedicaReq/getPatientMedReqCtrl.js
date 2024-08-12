import getPatientMedReq from "../../../handlers/patient/medicalRequest/getPatientMedReq.js";

const getPatientMedReqCtrl = async (req, res) => {
  let response = {};
  try {
    if (!req.query) {
      return res.status(400).send("Falta proporcionar el id del paciente");
    }
    if (req.query.patientId) {
      const { patientId } = req.query;
      response = await getPatientMedReq("patientId", patientId);
    } else {
      const { physicianId } = req.query;
      response = await getPatientMedReq("physicianId", physicianId);
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default getPatientMedReqCtrl;
