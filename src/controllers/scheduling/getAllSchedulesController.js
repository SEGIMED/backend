import getAllSchedulesHandler from "../../handlers/scheduling/getAllSchedulesHandler.js";

const getAllSchedulesController = async (req, res) => {
    try {
        const schedules = await getAllSchedulesHandler();
        return res.status(200).json(schedules);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export default getAllSchedulesController;