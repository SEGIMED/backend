import getAllUserContactHandler from '../../handlers/requestPatientContact/getAllUserContactHandler.js'

const getAllUserContactController = async (req,res) => { 
    try {
        const allRequests = await getAllUserContactHandler()
        return res.status(200).json(allRequests)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
 };

 export default getAllUserContactController;