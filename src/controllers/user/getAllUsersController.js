import getAllUsersHandler from "../../handlers/user/getAllUsersHandler.js";

const getAllUsersController = async (req, res)=>{
    try {
        const users = await getAllUsersHandler();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({error: error.message});
    } 
}

export default getAllUsersController