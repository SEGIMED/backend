import { DoctorSchedule } from "../../databaseConfig.js";
import moment from "moment";

const updateSchedule = async (req, res) => {
    const { id } = req.params;
    const { start_time, end_time } = req.body;
    try {
        await DoctorSchedule.update({
            start_time: moment(start_time, "HH:mm").format("HH:mm"),
            end_time: moment(end_time, "HH:mm").format("HH:mm"),

        }, {
            where: {
                doctor_id: id
            }
        })
        const dataUpdate = await DoctorSchedule.findAll({
            where: {
                doctor_id: id
            }
        })
        res.status(200).send(dataUpdate)
        return dataUpdate
    } catch(error) {
        console.error(error)
        res.status(200).json({ msj: error.message })
    }
}

export default updateSchedule;