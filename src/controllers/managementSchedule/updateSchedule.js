import updateScheduleHandler from "../../handlers/managementSchedule/updateScheduleHandler.js";

const updateSchedule = async (req, res) => {
    const { id } = req.query;
    const { start_time, end_time } = req.body;
    try {
        const response = await updateScheduleHandler(id, start_time, end_time);
        res.status(200).send(response);
    } catch(error) {
        console.error(error)
        res.status(200).json({ msj: error.message })
    }
}

export default updateSchedule;