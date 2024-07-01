import createBackgroundsHandler from "../../handlers/Backgrounds/createBackgroundsHandler.js";

const createBackgroundsController = async (req, res) => {
    try {
        const newBackground = req.body;
        const background = await createBackgroundsHandler(newBackground);
        return res.status(200).json(background);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createBackgroundsController;