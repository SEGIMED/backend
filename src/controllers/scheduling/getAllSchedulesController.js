import getAllSchedulesHandler from "../../handlers/scheduling/getAllSchedulesHandler.js";

const getAllSchedulesController = async (req, res) => {
    try {

        const patientId = req.query.patientId;
        const physicianId = req.query.physicianId
        const id = req.query.id;
        const schedules = await getAllSchedulesHandler(patientId, physicianId, id);
        return res.status(200).json(schedules);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default getAllSchedulesController;
