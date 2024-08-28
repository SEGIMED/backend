import { getPatientPhysicalExamination } from "../../handlers/patient/getPatientPhysicianExam.js";

const getPatientPhysicianExamCtrl = async (req, res) => {
  try {
    const { medicalEventId } = req.query;
    const exams = await getPatientPhysicalExamination(medicalEventId);
    return res.status(200).json(exams);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getPatientPhysicianExamCtrl;
