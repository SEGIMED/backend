import { AppointmentScheduling } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import Notify from "../../realtime_server/models/Notify.js";

const createSchedulingHandler = async (body) => {
  try {
 
    const newScheduling = await AppointmentScheduling.create(body);
       //TODO validaciones en hora y fecha, para que sean en formatos válidos.
    if(newScheduling){
      //Notification patient
      const appointmentStart = new Date(newScheduling.scheduledStartTimestamp);
      const newNotificationPatient = new Notify({
        content: {
          notificationType:"appointmentCreated",
          date: appointmentStart.toLocaleDateString(),
          hour: appointmentStart.toLocaleTimeString()
        },
        target: newScheduling.patient,
      });
      newNotificationPatient.save();
      //Notification physician
      const newNotificationPhysician = new Notify({
          content: { 
          notificationType:"appointmentCreated",
          date: appointmentStart.toLocaleDateString(),
          hour: appointmentStart.toLocaleTimeString()
        },
        target: newScheduling.physician,
      });
      newNotificationPhysician.save();
      
    return newScheduling;
    }
    
  } catch (error) {
    throw new SegimedAPIError("Error al crear el agendamiento", 500);
  }
};

export default createSchedulingHandler;
