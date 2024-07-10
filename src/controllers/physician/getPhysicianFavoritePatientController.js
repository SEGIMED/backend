import getPhysicianFavoritePatientHandler from "../../handlers/physicianHandlers/getPhysicianFavoritePatientHandler.js";


const getPhysicianFavoritePatientController = async (req, res) => {
    try {
        const physicianId = req.query.physicianId;
        const fav = await getPhysicianFavoritePatientHandler(physicianId);
        return res.status(200).json(fav);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default getPhysicianFavoritePatientController;