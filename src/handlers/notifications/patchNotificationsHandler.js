import Notify from "../../realtime_server/models/Notify.js";

const patchNotificationsHandler = async (notification_Id) => {
  try {
    
    let notification;
    if (notification_Id) {
      notification = await Notify.findById(notification_Id);
    } else {
      throw new Error(
        "Se requiere el _id de la notificación para hacer el cambio"
      );
    }

    if (notification) {
      await notification.markAsSeen();
      return "Notificación marcada como vista"
    } else {
      throw new Error("No se encontró la notificación en la base de datos");
    }
  } catch (error) {
    throw new Error(
      "Error al editar la notificación: " + error.message
    );
  }
};

export default patchNotificationsHandler;
