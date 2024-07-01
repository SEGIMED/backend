import createMedicalBackgroundsHandler from "../../handlers/medicalBackgrounds/createMedicalBackgroundsHandler.js";

const createMedicalBackgroundsController = async (req, res) => {
    try {
        const newBackground = req.body;
        const background = await createMedicalBackgroundsHandler(newBackground);
        return res.status(200).json(background);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createMedicalBackgroundsController;