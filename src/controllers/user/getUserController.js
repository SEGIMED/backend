import getUserHandler from "../../handlers/user/getUserHandler.js";

const getUserController = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await getUserHandler(id);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export default getUserController;
