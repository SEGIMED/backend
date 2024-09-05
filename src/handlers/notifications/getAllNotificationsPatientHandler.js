import Notify from "../../realtime_server/models/Notify.js";

const getAllNotificationsPatientHandler = async (patientId) => {
  try {
    let unseenNotifications;
    if (patientId) {
      unseenNotifications = await Notify.find({
        target: patientId,
      }).exec();
    } else {
      unseenNotifications = await Notify.find({
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

export default getAllNotificationsPatientHandler;
