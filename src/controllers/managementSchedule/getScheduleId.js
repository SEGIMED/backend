import { DoctorSchedule } from "../../databaseConfig.js";

const getScheduleById = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const data = await DoctorSchedule.findAll({
            where: {
                doctor_id: id
            }
        })
        res.status(200).send(data);
    } catch (error) {
        res.status(404).json({ msj: error.message })
    }
}
export default getScheduleById;