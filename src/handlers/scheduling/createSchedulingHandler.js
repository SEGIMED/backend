import { AppointmentScheduling } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import Notify from "../../realtime_server/models/Notify.js";
import validateAllowedDate from "../../validations/validateAllowedDate.js";

const createSchedulingHandler = async (body) => {
  try {
    const startTimeValidate = validateAllowedDate(body.scheduledStartTimestamp)
    const endTimeValidate = validateAllowedDate(body.scheduledEndTimestamp)
    if(!endTimeValidate||!startTimeValidate) throw new Error ('Formato de fecha inválido, no esposible crear la cita')

    const newScheduling = await AppointmentScheduling.create(body);
       
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
    throw new SegimedAPIError("Error al crear el agendamiento"+ error.message, 500);
  }
};

export default createSchedulingHandler;
