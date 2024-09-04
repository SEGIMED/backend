import getPatientMedReq from "../../../handlers/patient/medicalRequest/getPatientMedReq.js";

const getPatientMedReqCtrl = async (req, res) => {
  let response = {};
  try {
    if (!req.query) {
      return res.status(400).send("Falta proporcionar el query");
    }

    const { patientId, physicianId, status } = req.query;

    if (patientId) {
      response = await getPatientMedReq("patientId", patientId, status);
    } else if (physicianId) {
      response = await getPatientMedReq("physicianId", physicianId, status);
    } else {
      return res.status(400).send("Falta proporcionar patientId o physicianId");
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getPatientMedReqCtrl;