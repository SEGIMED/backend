import {AppointmentScheduling,User} from "../../databaseConfig.js";

const getAllSchedulesHandler = async () => {
    try {
        const schedules =  await AppointmentScheduling.findAll({
            include:[
                {
                    model:User,
                    as: 'patientUser',
                    attributes: ['name','lastname']
                }
            ]
        })
        return schedules
        
    } catch (error) {
        throw new Error("Error loading schedules: " + error.message);
    }
}

export default getAllSchedulesHandler