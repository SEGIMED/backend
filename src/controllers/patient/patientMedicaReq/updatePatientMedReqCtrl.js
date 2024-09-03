import updatePatientMedReq from "../../../handlers/patient/medicalRequest/updatePatientMedReq.js";

const updatePatientMedReqCtrl = async (req, res) => {
  try {
    const medReqId = req.query.id;
    const newPatientMedReq = req.body;
    const patientMedReq = await updatePatientMedReq(newPatientMedReq, medReqId);
    return res.status(200).send("Solicitud médica actualizada correctamente");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default updatePatientMedReqCtrl;
