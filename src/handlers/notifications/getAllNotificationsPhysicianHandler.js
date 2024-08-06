import Notify from "../../realtime_server/models/Notify.js";

const getAllNotificationsPhysicianHandler = async (physicianId) => {
  try {
    let unseenNotifications;
    if (physicianId) {
      unseenNotifications = await Notify.find({
        state: false,
        target: physicianId,
      }).exec();
    } else {
      unseenNotifications = await Notify.find({
        state: false,
      }).exec();
    }
    if (unseenNotifications.length === 0) {
      return [];
    } else {
      return unseenNotifications;
    }
  } catch (error) {
    throw new Error(
      "Error al obtener notificaciones no vistas: " + error.message
    );
  }
};

export default getAllNotificationsPhysicianHandler;
