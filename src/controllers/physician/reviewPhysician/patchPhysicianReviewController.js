import patchPhysicianReviewHandler from "../../../handlers/physicianHandlers/reviewPhysician/patchPhysicianReviewHandler.js"

const patchPhysicianReviewController= async (req, res)=>{
    try {
        const {id} = req.params
        const update= req.body
        const physicianReviewUpdated = await patchPhysicianReviewHandler(id,update)
        return res.status(200).json(physicianReviewUpdated)
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default patchPhysicianReviewController