import {PhysicianAttendancePlace} from "../../databaseConfig.js";

const updatePhysicianAttendancePlaceHandler = async (physicianAttendancePlaceToUpdate) => {
    const {id} = physicianAttendancePlaceToUpdate
    try {
        return await PhysicianAttendancePlace.update(
            physicianAttendancePlaceToUpdate,
            {
                where: {
                    id: id
                },
                returning: true,
            }
        )
    } catch (error) {
        throw new Error("Error updating physicians attendance place: " + error.message);
    }
};

export default updatePhysicianAttendancePlaceHandler;