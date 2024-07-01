
import { Op } from "sequelize";
import { AppointmentScheduling, User } from "../../databaseConfig.js";
import { sendMail } from "../sendMail.js";

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
   },
   include: [
     { model: User, as: 'patient_user' },
   ],
 });

 
 for (const appointment of appointments) {
    const patient = await User.findByPk(appointment.patient);
    const patientEmail= patient.email;
    const appointmentStart = new Date(appointment.scheduledStartTimestamp);
    const appointmentSubject = "Recordatorio de cita";
    const appointmentBody = `
      <p>Este es un recordatorio para su próxima cita:</p>
      <p>Fecha: ${appointmentStart.toLocaleDateString()}</p>
      <p>Hora: ${appointmentStart.toLocaleTimeString()}</p>
    `;

    try {
      await sendMail(patientEmail, appointmentBody, appointmentSubject);
      console.log(`Correo electrónico de recordatorio enviado a ${patientEmail} para la cita del ${appointmentStart}`);
    } catch (error) {
      console.error(`Error al enviar correo electrónico de recordatorio para la cita: ${error.message}`);
    }
  }
};

export default scheduleReminderEmails


