import updateMedicalEventHandler from "../../handlers/medicalEvent/updateMedicalEventHandler.js";


const updateMedicalEventController = async (req, res) => {
    try {
        const updatedEvent = await updateMedicalEventHandler(req.body);
        return res.status(200).json(updatedEvent);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updateMedicalEventController;
