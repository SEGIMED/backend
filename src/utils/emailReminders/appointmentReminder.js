import { Op } from "sequelize";
import { AppointmentScheduling, User } from "../../databaseConfig.js";
import { sendMail } from "../sendMail.js";
import Notify from "../../realtime_server/models/Notify.js";

const scheduleReminderEmails = async () => {
  const tomorrow = new Date(); // Get base date for tomorrow
  tomorrow.setDate(tomorrow.getDate() + 1);

  const mananaInicio = new Date(tomorrow); // Create new date object for tomorrow
  mananaInicio.setHours(0, 0, 0);

  const mananaFinal = new Date(tomorrow); // Create new date object for tomorrow
  mananaFinal.setHours(23, 59, 59); // Set time to 23:59:59

  const appointments = await AppointmentScheduling.findAll({
    where: {
      scheduled_start_timestamp: {
        [Op.between]: [mananaInicio, mananaFinal],
      },
      scheduling_status: 1, //scheduled status
    },
  });

  for (const appointment of appointments) {
    //It sends a notification for every patient to email
    const patient = await User.findByPk(appointment.patient);
    const patientEmail = patient.email;
    const appointmentStart = new Date(appointment.scheduledStartTimestamp);
    const appointmentSubject = "Recordatorio de cita";
    const appointmentBody = `
      <p>Este es un recordatorio para su próxima cita:</p>
      <p>Fecha: ${appointmentStart.toLocaleDateString()}</p>
      <p>Hora: ${appointmentStart.toLocaleTimeString()}</p>
    `;
    //TODO change as a  find or create
    const newNotification = new Notify({
      // It sends notification for every patient to web app
      content: {
        message:
       `Este es un recordatorio para su próxima cita:
        Fecha: ${appointmentStart.toLocaleDateString()}
        Hora: ${appointmentStart.toLocaleTimeString()} `,
      },
      target: appointment.patient,
    });
    newNotification.save();

    const newNotificationPhysician = new Notify({
      // It sends notification for every physician to web app
      content: {
        message: 
        `Este es un recordatorio para su próxima cita por atender:
         Fecha: ${appointmentStart.toLocaleDateString()}
         Hora: ${appointmentStart.toLocaleTimeString()}`,
      },
      target: appointment.physician,
    });
    newNotificationPhysician.save();

    try {
      await sendMail(patientEmail, appointmentBody, appointmentSubject);
    } catch (error) {
      console.error(
        `Error al enviar correo electrónico de recordatorio para la cita: ${error.message}`
      );
    }
  }
};

export default scheduleReminderEmails;
