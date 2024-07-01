import updatePatientPhysicalExaminationHandler from "../../handlers/patient/updatePatientPhysicalExaminationHandler.js";


const updatePatientPhysicalExaminationController = async (req, res) => {
    try {
        const updatePhysicalExamination = req.body;
        const updatedExamination = await updatePatientPhysicalExaminationHandler(updatePhysicalExamination);
        return res.status(200).json(updatedExamination);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updatePatientPhysicalExaminationController;