import {AppointmentScheduling} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";


const createSchedulingHandler = async (body) => {
    try {
        const newScheduling = await AppointmentScheduling.create(
            body
        )
        
        return newScheduling
    } catch (error) {
        console.log(error)
        throw new SegimedAPIError("Error al crear el agendamiento", 500)
    }

}

export default createSchedulingHandler;