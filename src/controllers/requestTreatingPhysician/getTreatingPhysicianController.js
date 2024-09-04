import { getRequestHandler } from "../../handlers/requestTreatingPhysician/getTreatingPhysicianHandler.js";

export const getRequestController = async (req, res) =>{
    try {
        const message = await getRequestHandler()
        return res.status(200).json({message})
    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });  
    }
 }