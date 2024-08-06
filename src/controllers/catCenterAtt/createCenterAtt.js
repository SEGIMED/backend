import models from "../../databaseConfig.js";

const createCenterAtt = async (req, res) => {
    const { name, address, phone, email, city } = req.body;
    try {
        const centerAtt = await models.CatCenterAttention.create({
            name,
            address,
            phone,
            email,
            city,
        });
        return res.status(201).json({
        centerAtt,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default createCenterAtt;