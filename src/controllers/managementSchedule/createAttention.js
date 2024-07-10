import { DoctorSchedule, User } from "../../databaseConfig.js";
import moment from "moment";

const createSchedule = async (req, res) => {
    const { openAtt, closeAtt } = req.body;
    try {
        // nos traemos al usuario
         const doctor_id = await User.findByPk(13);
         
         // luego realizamos la operacion de registro
        await DoctorSchedule.create({
            doctor_id,
            start_time: moment(openAtt, "HH:mm").format("HH:mm"),
            end_time: moment(closeAtt, "HH:mm").format("HH:mm"),
        })
        res.status(200).json({ message: "Registro con exito"})
    } catch (error) {
        res.status(400).json({message: error.message})
        console.error(error.message)
    }
}

export default createSchedule;