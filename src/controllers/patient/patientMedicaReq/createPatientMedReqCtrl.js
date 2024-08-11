import createPatientMedReq from "../../../handlers/patient/medicalRequest/createPatientMedReq.js";

const createPatientMedReqCtrl = async (req, res) => {
  try {
    const { patientId } = req.query;
    const newPatientMedReq = req.body;
    const patientMedReq = await createPatientMedReq(
      newPatientMedReq,
      patientId
    );
    return res.status(200).json(patientMedReq);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default createPatientMedReqCtrl;
