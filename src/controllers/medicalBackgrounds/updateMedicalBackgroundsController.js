import updateMedicalBackgroundHandler from "../../handlers/medicalBackgrounds/updateMedicalBackgroundsHandler.js";

const updateMedicalBackgroundsController = async (req, res) => {
    try {
        const updatedBackground = req.body;
        const background = await updateMedicalBackgroundHandler(updatedBackground);
        return res.status(200).json(background);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updateMedicalBackgroundsController;