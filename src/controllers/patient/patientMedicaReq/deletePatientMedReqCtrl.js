import { deletePatientMedReq } from "../../../handlers/patient/medicalRequest/deletePatientMedReq.js";

const deletePatientMedReqCtrl = async (req, res) => {
  try {
    const medReqId = req.query.id;
    await deletePatientMedReq(medReqId);
    return res.status(200).send("Solicitud médica eliminada correctamente");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default deletePatientMedReqCtrl;
