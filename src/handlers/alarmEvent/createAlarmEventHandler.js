import { AlarmEvent, User } from "../../databaseConfig.js";
import { mapquestionsPriority } from "../../mapper/alarmEvent/alarmEventMapper.js";
import { alarmHtml } from "../../utils/emailTemplates/alarmHtml.js";
import { sendMail } from "../../utils/sendMail.js";
const createAlarmEventHandler = async (body) => {
  try {
    let { patient, alarmDescription, questionsPriority } = body;

    questionsPriority = JSON.parse(questionsPriority);

    const alarmEvent = await AlarmEvent.create({
      patient,
      alarmDescription,
      questionsPriority,
    });

    alarmEvent.questionsPriority = await mapquestionsPriority(
      questionsPriority
    );

    const formatDate = (date) => {
        const options = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        };
        
        const formattedDate = new Intl.DateTimeFormat('es-AR', options).format(date);
        const timePart = formattedDate.split(", ")[1]; // Extraer la parte de la hora
        return `${formattedDate.split(", ")[0]} - ${timePart}`;
      };
      
      const currentDate = new Date();

    const patientData = await User.findByPk(patient)
    const allPhysicians = await User.findAll({
        where: {
          role: 2,
        },
      });
      allPhysicians.forEach(async (e) => {
        await sendMail(e.email, alarmHtml(patientData, formatDate(currentDate)), "Se ha generado una nueva alarma");
      });
    return alarmEvent;
  } catch (error) {
    throw new Error("Ha habido un error al crear la alarma: " + error.message);
  }
};

export default createAlarmEventHandler;
