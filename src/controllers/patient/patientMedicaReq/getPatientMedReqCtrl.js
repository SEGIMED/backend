import getPatientMedReq from "../../../handlers/patient/medicalRequest/getPatientMedReq.js";

const getPatientMedReqCtrl = async (req, res) => {
  try {
    const { patientId } = req.query;
    const patientMedReq = await getPatientMedReq(patientId);
    return res.status(200).json(patientMedReq);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default getPatientMedReqCtrl;
