import createPhysicianFavoritePatientHandler from "../../handlers/physicianHandlers/createPhysicianFavoritePatientHandler.js";


const createPhysicianFavoritePatientController = async (req, res) => {
    try {
        const fav = await createPhysicianFavoritePatientHandler(req.body);
        return res.status(201).json(fav);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createPhysicianFavoritePatientController;