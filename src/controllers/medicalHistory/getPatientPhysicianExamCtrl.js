import getPatientPhysicalExamination from "../../handlers/medicalHistory/getPatientPhysicianExam.js";

const getPatientPhysicianExamCtrl = async (req, res) => {
  try {
    const { patientId, physicianId, medicalSpecialtyId, page, limit } =
      req.query;
    const exams = await getPatientPhysicalExamination({
      patientId,
      physicianId,
      medicalSpecialtyId,
      page,
      limit,
    });
    return res.status(200).json(exams);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getPatientPhysicianExamCtrl;
