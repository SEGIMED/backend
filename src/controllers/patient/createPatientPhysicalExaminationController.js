import createPatientPhysicalExaminationHandler from "../../handlers/patient/createPatientPhysicalExaminationHandler.js";


const createPatientPhysicalExaminationController = async (req, res) => {
    try {
        const newPhysicalExamination = req.body;
        const Examination = await createPatientPhysicalExaminationHandler(newPhysicalExamination);
        return res.status(200).json(Examination);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createPatientPhysicalExaminationController;