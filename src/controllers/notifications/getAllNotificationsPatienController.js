import getAllNotificationsPatientHandler from "../../handlers/notifications/getAllNotificationsPatientHandler.js"

const getAllNotificationsPatientController = async (req,res) => {
    try {
        const {patientId} = req.query
        const unseenNotifications = await getAllNotificationsPatientHandler(patientId)
        return res.status(201).json(unseenNotifications);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default getAllNotificationsPatientController