import { User, DoctorSchedule } from "../../databaseConfig.js";

const getAllSchedules = async (req, res) => {
    try {
        const data = await DoctorSchedule.findAll({
            include: {
                model: User,
                attributes: ["name"],
            }
        })
        const response = data.map(({ doctor_id, date, start_time, end_time, User }) => {
            return {
                doctor_id,
                date,
                start_time,
                end_time,
                doctor: User.name
            }
        })
        res.status(200).send(response)
        return response;
    } catch (error) {
        res.status(400).json({message: error.message});
        console.error(error.message);
    }
}

export default getAllSchedules;