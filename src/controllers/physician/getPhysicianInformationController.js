import getPhysicianInformationHandler from "../../handlers/physicianHandlers/getPhysicianInformationHandler.js";

const getPhysicianInformationController = async (req, res) => {
    try {
        const id = req.query.id;
        const physicianInformation = await getPhysicianInformationHandler(id);
        return res.status(200).json(physicianInformation);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default getPhysicianInformationController;