import getAllPhysiciansHandler from "../../handlers/physicianHandlers/getAllPhysiciansHandler.js";


const getAllPhysiciansController = async (req, res) => {
    try {
        const allPhysicians = await getAllPhysiciansHandler()
        res.status(200).json(allPhysicians);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export default getAllPhysiciansController;