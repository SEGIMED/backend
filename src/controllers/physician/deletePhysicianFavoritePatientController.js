import deletePhysicianFavoritePatientHandler from "../../handlers/physicianHandlers/deletePhysicianFavoritePatientHandler.js";


const deletePhysicianFavoritePatientController = async (req, res) => {
    try {
        const fav = await deletePhysicianFavoritePatientHandler(req.body);
        return res.status(200).json(fav);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default deletePhysicianFavoritePatientController;