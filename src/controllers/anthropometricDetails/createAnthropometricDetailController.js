import createAnthropometricDetailHandler
    from "../../handlers/anthropometricDetails/createAnthropometricDetailHandler.js";

const createAnthropometricDetailController = async (req, res) => {
    try {
        const newAnthropometricDetail = req.body;
        const anthropometricDetail = await createAnthropometricDetailHandler(newAnthropometricDetail);
        return res.status(200).json(anthropometricDetail);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createAnthropometricDetailController;