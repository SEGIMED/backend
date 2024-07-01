import deleteSchedulingtHandler from "../../handlers/scheduling/deleteSchedulingHandler.js"

const deleteSchedulingController = async (req,res)=>{
    try {
        const {id} = req.params;
        const response = await deleteSchedulingtHandler(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export default deleteSchedulingController