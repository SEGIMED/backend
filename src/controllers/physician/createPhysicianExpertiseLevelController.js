import createPhysicianExpertiseLevelHandler
    from "../../handlers/physicianHandlers/createPhysicianExpertiseLevelHandler.js";


const createPhysicianExpertiseLevelController = async (req, res) => {
    try {
        const expertiseLevel = await createPhysicianExpertiseLevelHandler(req.body);
        return res.status(200).json(expertiseLevel);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createPhysicianExpertiseLevelController;