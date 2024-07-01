import updateUserInformationHandler from "../../handlers/user/updateUserInformationHandler.js";


const updateUserInformationController = async (req, res) =>  {
    try {
        const updateUser = await updateUserInformationHandler(req.body);
        return res.status(200).json(updateUser);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updateUserInformationController;