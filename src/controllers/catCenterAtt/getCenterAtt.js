import models from "../../databaseConfig.js";

const getCenterAtt = async (req, res) => {
    try {
        const centerAtt = await models.CatCenterAttention.findAll();
        return res.status(200).json({
        centerAtt,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default getCenterAtt;