import { User } from "../../databaseConfig";

export const createAttention = async (req, res) => {
    const { openAtt, closeAtt } = req.body;
    try {
        
    } catch (error) {
        res.status(400).json({message: error.message})
        console.error(error.message)
    }
}