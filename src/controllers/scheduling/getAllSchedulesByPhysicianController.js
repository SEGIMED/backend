import getAllSchedulesByPhysicianHandler from "../../handlers/scheduling/getAllSchedulesByPhysicianHandler.js";

const getAllSchedulesByPhysicianController = async (req, res) => {
    try {
        const schedules = await getAllSchedulesByPhysicianHandler();
        return res.status(200).json(schedules);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export default getAllSchedulesByPhysicianController;