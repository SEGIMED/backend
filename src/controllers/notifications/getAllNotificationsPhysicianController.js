import getAllNotificationsPhysicianHandler from "../../handlers/notifications/getAllNotificationsPhysicianHandler.js"

const getAllNotificationsPhysicianController = async (req,res)=>{
    try {
        const{physicianId}=req.query
        const unseenNotifications = await getAllNotificationsPhysicianHandler(physicianId)
        return res.status(201).json(unseenNotifications);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
export default getAllNotificationsPhysicianController