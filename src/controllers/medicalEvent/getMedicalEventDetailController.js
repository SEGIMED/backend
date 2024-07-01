import getMedicalEventDetailHandler from "../../handlers/medicalEvent/getMedicalEventDetailHandler.js";


const getMedicalEventDetailController = async (req, res) => {
    try {
        const medicalEventId = req.query.medicalEventId;
        const MedicalEventDetail = await getMedicalEventDetailHandler(medicalEventId);
        return res.status(200).json(MedicalEventDetail);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default getMedicalEventDetailController;