import models from "../../databaseConfig.js";

const getAllSchedulesByPhysicianHandler = async () => {
    try {
        const schedules =  await models.AppointmentScheduling.findAll()
        return schedules
        
    } catch (error) {
        throw new Error("Error loading schedules: " + error.message);
    }
}

export default getAllSchedulesByPhysicianHandler