import getPatientsHandler from "../../handlers/patient/getPatientsHandler.js";

const getPatientsController = async (req, res) => {
  const { limit, page, name, risk ,physicianId, onlyFavorites} = req.query;
  const onlyFavoritesBoolean = onlyFavorites == "true";
  try {
    const users = await getPatientsHandler({ limit, page, name, risk, physicianId}, onlyFavoritesBoolean);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getPatientsController;

