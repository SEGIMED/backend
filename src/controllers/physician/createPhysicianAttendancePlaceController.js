import createPhysicianAttendancePlaceHandler
    from "../../handlers/physicianHandlers/createPhysicianAttendancePlaceHandler.js";


const createPhysicianAttendancePlaceController = async (req, res) => {
    try {
        const newPlace = req.body;
        const place = await createPhysicianAttendancePlaceHandler(newPlace);
        return res.status(200).json(place);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createPhysicianAttendancePlaceController;