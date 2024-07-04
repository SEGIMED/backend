import { AppointmentScheduling, User } from "../../databaseConfig.js";

const getAllSchedulesHandler = async (patientId, physicianId, id) => {
    try {
        const filters = {}
        if (patientId) {
            filters.patient = patientId
        }
        if (physicianId) {
            filters.physician = physicianId
        }
        if (id) {
            filters.id = id
        }
        const schedules = await AppointmentScheduling.findAll({
            where: filters,
            include: [
                {
                    model: User,
                    as: 'patientUser',
                    attributes: ['name', 'lastname', 'avatar'],
                },
                {
                    model: User,
                    as: 'physicianThatAttend',
                    attributes: ['name', 'lastname', 'avatar'],
                }
            ],
        })
        return schedules

    } catch (error) {
        throw new Error("Error loading schedules: " + error.message);
    }
}

export default getAllSchedulesHandler