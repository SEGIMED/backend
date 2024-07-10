import { DoctorSchedule, User } from "../../databaseConfig.js";
import moment from "moment";

const createSchedule = async (req, res) => {
    const { idUser } = req.params
    const { openAtt, closeAtt } = req.body;
    try {
         // luego realizamos la operacion de registro
        await DoctorSchedule.create({
            doctor_id: idUser,
            start_time: moment(openAtt, "HH:mm:ss").format("HH:mm:ss"),
            end_time: moment(closeAtt, "HH:mm:ss").format("HH:mm:ss"),
        })
        res.status(200).json({ message: "Registro con exito"})
    } catch (error) {
        res.status(400).json({message: error.message})
        console.error(error.message)
    }
}

export default createSchedule;