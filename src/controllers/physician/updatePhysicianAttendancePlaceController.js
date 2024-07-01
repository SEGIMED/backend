import updatePhysicianAttendancePlaceHandler from "../../handlers/physicianHandlers/updatePhysicianAttendancePlaceHandler.js";


const updatePhysicianAttendancePlaceController = async (req, res) => {
    try {
        const physicianAttendancePlaceToUpdate = req.body;
        const updatedPhysician = await updatePhysicianAttendancePlaceHandler(physicianAttendancePlaceToUpdate);
        return res.status(200).json(updatedPhysician);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updatePhysicianAttendancePlaceController;