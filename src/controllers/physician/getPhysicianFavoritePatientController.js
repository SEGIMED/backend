import getPhysicianFavoritePatientHandler from "../../handlers/physicianHandlers/getPhysicianFavoritePatientHandler.js";

const getPhysicianFavoritePatientController = async (req, res) => {
  try {
    const { physicianId, page, limit } = req.query;
    const fav = await getPhysicianFavoritePatientHandler(
      physicianId,
      page,
      limit
    );
    return res.status(200).json(fav);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getPhysicianFavoritePatientController;
