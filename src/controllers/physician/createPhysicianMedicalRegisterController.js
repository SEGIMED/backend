import createPhysicianMedicalRegisterHandler
    from "../../handlers/physicianHandlers/createPhysicianMedicalRegisterHandler.js";


const createPhysicianMedicalRegisterController = async (req, res) => {
    try {
        const newPhysicianRegistry = req.body;
        const registry = await createPhysicianMedicalRegisterHandler(newPhysicianRegistry);
        return res.status(200).json(registry);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createPhysicianMedicalRegisterController;