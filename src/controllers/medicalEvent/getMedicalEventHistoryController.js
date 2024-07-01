import getMedicalEventHistoryHandler from "../../handlers/medicalEvent/getMedicalEventHistoryHandler.js";


const getMedicalEventHistoryController = async (req, res) => {
    try {
        const patientId = req.query.patientId;
        const physicianId =  req.query.physicianId
        const MedicalEventHistory = await getMedicalEventHistoryHandler(patientId,physicianId);
        return res.status(200).json(MedicalEventHistory);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default getMedicalEventHistoryController;