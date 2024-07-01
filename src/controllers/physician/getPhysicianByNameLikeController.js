import getPhysicianByNameLikeHandler from "../../handlers/physicianHandlers/getPhysicianByNameLikeHandler.js";

const getPhysicianByNameLikeController = async (req, res) => {
    try {
        const name = req.query.name;
        const physicianNameLike = await getPhysicianByNameLikeHandler(name);
        return res.status(200).json(physicianNameLike);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default getPhysicianByNameLikeController;