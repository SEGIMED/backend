import updateAnthropometricDetailsHandler
    from "../../handlers/anthropometricDetails/updateAnthropometricDetailsHandler.js";


const updateAnthropometricDetailController = async (req, res) => {
    try {
        const updateAnthDetail = req.body;
        const anthropometricDetail = await updateAnthropometricDetailsHandler(updateAnthDetail);
        return res.status(200).json(anthropometricDetail);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updateAnthropometricDetailController;