import createPhysicianSpecialtyHandler from "../../handlers/physicianHandlers/createPhysicianSpecialtyHandler.js";


const createPhysicianSpecialtyController = async (req, res) => {
    try {
        const specialty = await createPhysicianSpecialtyHandler(req.body);
        return res.status(200).json(specialty);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createPhysicianSpecialtyController;