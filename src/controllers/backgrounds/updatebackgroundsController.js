import updateBackgroundsHandler from "../../handlers/Backgrounds/updateBackgroundsHandler.js";

const updateBackgroundsController = async (req, res) => {
  try {
    const { id } = req.query;
    const updatedBackground = req.body;
    const background = await updateBackgroundsHandler(id, updatedBackground);
    return res.status(200).json(background);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export default updateBackgroundsController;
