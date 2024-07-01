import patchResolveUserContactHandler from "../../handlers/requestPatientContact/patchResolveUserContactHandler.js";

const patchResolveUserContactController = async(req,res)=>{
    
    try {
        const {id}=req.params
        const resolveAnswer= await patchResolveUserContactHandler(id)
        return res.status(200).json('Patient contact request has been resolved')
    } catch (error) {
        return res.status(500).json({error: error.message}) 
    }
};

export default patchResolveUserContactController