import patchNotificationsHandler from "../../handlers/notifications/patchNotificationsHandler.js"

const patchNotificationsController = async (req,res) => {
    try {
        const {notification_Id} = req.query
        await patchNotificationsHandler(notification_Id)
        return res.status(200).json("Notificación marcada como vista");
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default patchNotificationsController