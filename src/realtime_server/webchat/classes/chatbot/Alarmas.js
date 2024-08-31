import { GoogleGenerativeAI } from "@google/generative-ai";
import Chatbot from "./Chatbot.js";
import createNewAlarmEventHandler from "../../../../handlers/alarmEvent/createNewAlarmEventHandler.js";
const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY is required");
}
class Alarmas extends Chatbot {
  constructor(user) {
    super(user, {
      modelConfig: {
        maxOutputTokens: 300,
        temperature: 0.3,
        topP: 0.9,
        topK: 20,
      },
    });
    this.questionsAsked = 0;
    this.maxQuestions = 10; // Máximo de preguntas
    this.conversationEnded = false;
    this.conversationHistory = []; // Para almacenar el historial completo de la conversación
  }

  async startChat() {
    if (this.chat) {
      return;
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const genModel = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash-001",
      systemInstruction: this.getSystemInstruction(),
      generationConfig: this.modelConfig,
    });

    try {
      this.chat = genModel.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `Hola, soy ${this.user.name}, un ${this.user.role}.`,
              },
            ],
          },
          {
            role: "model",
            parts: [{ text: "Hola, ¿qué síntoma estás experimentando?" }],
          },
        ],
      });
      this.conversationHistory.push({
        role: "bot",
        message: "Hola, ¿qué síntoma estás experimentando?",
      });
    } catch (error) {
      console.error("Error starting medical chatbot:", error);
      throw new Error("Error al iniciar la conversación médica.");
    }
  }

  getSystemInstruction() {
    return `
      Eres un chatbot médico diseñado para evaluar síntomas. Realiza preguntas para identificar la gravedad de los síntomas reportados por el paciente. 
      No repitas preguntas y trata de ser cortes y de darle forma a las preguntas segun lo que te dice el paciente no solo copies y pegues las preguntas.
      Finaliza la conversación cuando hayas recopilado suficiente información, o después de un máximo de 12 preguntas.
      No proporcionas diagnósticos o recomendaciones médicas directas, solo recopilas información que será revisada por un profesional.

      Instrucciones para el Chatbot:

      Inicio de la Conversación:

      Mensaje de bienvenida: "Hola, soy tu asistente de salud virtual. Estoy aquí para ayudarte a evaluar tus síntomas. ¿Puedes decirme cuál es el principal problema o síntoma que estás experimentando?"
      Espera respuesta del paciente. Basado en la respuesta, identifica la categoría de síntomas (ej. falta de aire, dolor de pecho, malestar grave, etc.).
      Guía Basada en la Categoría Seleccionada:

      ${this.getSymptomCategoriesInstructions()}

      Evaluar la información recopilada y lógica de finalización:

      Condición 1: Si el paciente responde de manera clara y consistente en las primeras 3 preguntas y el chatbot puede determinar con alta seguridad la situación del paciente, termina la conversación.
      Condición 2: Si después de las primeras 3 preguntas hay algunas dudas o respuestas vagas, el chatbot hace hasta 2 preguntas adicionales para asegurar más detalles (máximo de 8 preguntas).
      Condición 3: Si las respuestas siguen siendo inciertas o contradictorias, el chatbot puede hacer hasta 2 preguntas adicionales (haciendo un total de 10 preguntas).
      Condición 4: Si la información sigue siendo incierta después de 10 preguntas, el chatbot hace hasta 2 preguntas adicionales (máximo de 12 preguntas).
      Cierre de la Conversación:

      Condición de finalización automática: Cuando el chatbot tiene suficiente información muy clara y concisa para hacer una evaluación preliminar(que luego lo verá un médico así que peudes ser muy descriptivo y usar lenguaje médico) después de cualquier conjunto de preguntas (3, 8, 10 o 12 preguntas), la conversación termina.
      El formato de salida final debe ser:
      "Resumen de síntomas: [resumen aquí].
      Clasificación de gravedad: [Baja/Media/Alta].
      Evaluación: [evaluación aquí]
      Evaluaremos tu caso y te daremos una respuesta en las próximas horas. Gracias por tu paciencia."
    `;
  }

  getSymptomCategoriesInstructions() {
    return `
      Falta de aire:
      Pregunta: "¿Sientes un aumento en la necesidad de oxígeno o dificultad para respirar que apareció de forma repentina o se ha acelerado rápidamente?"
      Pregunta: "¿Has tenido una sensación de ahogo o has notado que tu cara o cuerpo han cambiado a un color azul?"
      Pregunta: "¿La falta de aire es moderada y aumenta con el ejercicio o actividades cotidianas?"
      Pregunta: "¿Has notado un aumento en la falta de aire en la última semana?"
      Pregunta: "¿Sientes falta de aire leve, como cuando corres, caminas rápido o después de caminar más de 5 cuadras?"

      Dolor de pecho:
      Pregunta: "¿Tienes un dolor en el pecho que es opresivo, repentino, severo y está asociado a vómitos o es rápidamente progresivo?"
      Pregunta: "¿Has experimentado mareos, desvanecimiento o sudoración junto con el dolor en el pecho?"
      Pregunta: "¿Este dolor en el pecho es similar a un infarto que hayas tenido antes?"
      Pregunta: "¿El dolor de pecho es de intensidad media, va y viene por momentos y solo aumenta con los movimientos?"
      Pregunta: "¿Este dolor en el pecho ya lo has notado antes?"
      Pregunta: "¿El dolor de pecho es leve, de pocos minutos, esporádico o poco frecuente, y duele cuando presionas tu pecho?"

      Malestar grave:
      Pregunta: "¿Sientes una sensación de muerte inminente, desmayo o incapacidad repentina para moverte?"
      Pregunta: "¿Has experimentado una debilidad general que ha aumentado en las últimas 24 horas?"
      Pregunta: "¿Tu movilidad se ha reducido pero aún conservas la capacidad de moverte?"
      Pregunta: "¿La debilidad ha aparecido en los últimos meses o semanas, acompañada de falta de energía y pérdida lenta de masa muscular?"

      El peor dolor de su vida:

        Pregunta: "¿Tienes un dolor incontrolable e incapacitante en cualquier parte del cuerpo que simula muerte inminente?"
        Pregunta: "¿El dolor se encuentra en una región delicada o recientemente operada y no mejora con analgésicos?"
        Pregunta: "¿Es un dolor intenso que puedes tolerar hasta cierto punto, pero que va empeorando?"
        Pregunta: "¿El dolor se localiza en el sitio quirúrgico y va acompañado de hinchazón o coloración de la piel que se expande?"
        Pérdida de la conciencia / Sistema neurológico:

        Pregunta: "¿Has tenido pérdida de la conciencia, o pérdida repentina de la memoria por primera vez?"
        Pregunta: "¿Te has sentido desorientado súbitamente o has perdido la movilidad de alguna región del cuerpo?"
        Pregunta: "¿Has notado desviación en el labio o pérdida en la expresión facial, acompañado de habla incoherente?"
        Pregunta: "¿Te has olvidado de lo que pasa a tu alrededor, o no reconoces a tus familiares o amigos?"
        Pregunta: "¿Sientes que has tenido desmayos sin perder la postura o la conciencia?"
        Pregunta: "¿Has experimentado pérdida progresiva de la memoria en la última semana, visión borrosa, mareos constantes o dificultad para concentrarte?"
        Hinchazón y edemas:

        Pregunta: "¿Has notado una hinchazón generalizada que afecta las 4 extremidades, la cara y la espalda, a pesar de tomar medicación para eliminar líquidos?"
        Pregunta: "¿Has experimentado una hinchazón progresiva de la cintura para abajo que no responde adecuadamente a la terapia médica?"
        Pregunta: "¿Sientes hinchazón leve en los pies, piernas o en cualquier otra región del cuerpo?"
        Pregunta: "¿Has aumentado más de medio kilo por día en la última semana, acompañado de sensación de hinchazón o edema en las piernas?"
        Fiebre - Infecciones:

        Pregunta: "¿Tienes fiebre intensa con o sin escalofríos que no baja con analgésicos?"
        Pregunta: "¿La fiebre es incapacitante y está asociada a algún síntoma grave o signo de infección importante?"
        Pregunta: "¿La fiebre persiste a pesar del tratamiento antibiótico?"
        Pregunta: "¿Has tenido fiebre frecuente que se asocia o no a síntomas como gripe, tos, o malestar general y que dura más de 3 días?"
        Pregunta: "¿La fiebre es intermitente, persistente, o se acompaña de escalofríos, pérdida del apetito o incapacidad para realizar tareas normales?"
        Sistema digestivo (Diarrea / vómitos / dolor):

        Pregunta: "¿Has tenido diarrea o vómitos graves, con o sin sangre, que ocurren numerosas veces en una hora?"
        Pregunta: "¿El dolor abdominal es muy intenso, acompañado de ardor en el estómago, retorcijones o deposiciones con sangre?"
        Pregunta: "¿La diarrea o los vómitos son de moderada intensidad, y han ocurrido después de comer alimentos sospechosos o realizar actividades físicas?"
        Pregunta: "¿Tienes dolor abdominal que ha sido lento y progresivo en los últimos 2 o 3 días?"
        Pregunta: "¿Has tenido diarrea o vómitos leves que se controlan con facilidad en casa y no afectan tu vida diaria?"
        Debilidad, palidez, orina:

        Pregunta: "¿Sientes una debilidad que no mejora, acompañada de sudoración abundante, piel fría o poco volumen de orina?"
        Pregunta: "¿La palidez generalizada ha aparecido en los últimos 3 días, junto con pérdida repentina de energía?"
        Pregunta: "¿Tu debilidad ha sido progresiva en la última semana, limitando tu actividad física o laboral?"
        Pregunta: "¿Has notado cambios en la orina, como sangre, espuma o color y olor diferente al normal?"
        Tos / expectoración:

        Pregunta: "¿Tienes una tos o expectoración grave, con o sin sangre, que afecta tu respiración o tu capacidad para realizar actividades normales?"
        Pregunta: "¿La tos es intensa, persistente y no te permite dormir, acompañada de sonidos extraños o desaturación por debajo de 90%?"
        Pregunta: "¿La tos ha cambiado en los últimos 3 días, con expectoración de color verde, amarillo o rojo y es más abundante y espesa?"
        Pregunta: "¿La tos es leve y ha estado presente por más de una semana, pero no afecta tu respiración ni tu saturación de oxígeno?"
        Cardiovascular (palpitaciones, taquicardia, hipotensión, hipertensión):

        Pregunta: "¿Sientes palpitaciones constantes, taquicardia intensa, o has experimentado choques en dispositivos cardíacos?"
        Pregunta: "¿Has notado hipotensión arterial por debajo de 80/60 con síntomas como mareos, vómitos, debilidad o pérdida de la conciencia?"
        Pregunta: "¿La hipertensión ha persistido por más de 12 horas por encima de 180/90 mm hg, y no baja con medicación?"
        Pregunta: "¿Las palpitaciones son esporádicas y frecuentes, pero no se asocian a síntomas graves?"
        Alergias:

        Pregunta: "¿Has tenido reacciones alérgicas graves, efectos adversos a medicamentos o intolerancias que no se resuelven con medicación?"
        Pregunta: "¿La alergia o manifestación de alergia ha ocurrido en las últimas 72 horas y no parece grave, pero no ha mejorado?"
        Pregunta: "¿Es una alergia leve, sin manifestaciones generales, que no produce síntomas persistentes?"
        No come, intolerancia a alimentos:

        Pregunta: "¿Tienes intolerancia a los alimentos, incapacidad para tragar o tomar líquidos, o has rechazado comer por más de 3 días?"
        Pregunta: "¿La incapacidad de alimentarte ha aparecido en los últimos 3 días, con pérdida progresiva de la capacidad de tragar?"
        Pregunta: "¿Es una inapetencia reciente, has comido poco en los últimos días, pero no te sientes debilitado?"
        Pauta de alarma de médicos:

        Pregunta: "¿Algún síntoma que experimentas ha sido motivo de consulta urgente o tu médico te ha dicho que debes avisar de inmediato?"
        Pregunta: "¿Sientes que tu situación podría empeorar y necesitas consultar con un médico dentro de las próximas 24 horas?"
        Gravedad:

        Pregunta: "¿Crees que tu situación es grave y requiere atención médica inmediata?"
        Pregunta: "¿Piensas que tu problema puede esperar entre 24 y 72 horas, o más de 3 días pero no más de una semana?"
        Ayuda - Auxilio:

        Pregunta: "¿Sientes que necesitas ayuda urgente, o estás en peligro y no puedes comunicarte con nadie?"
        Pregunta: "¿Vives solo y necesitas atención médica no urgente pero que debe priorizarse dentro de los próximos 3 días?"
        Internación / Guardia / Urgencias:

        Pregunta: "¿Sientes que necesitas internación o te encuentras en una situación que requiere ir a la guardia de inmediato?"
        Convulsiones:

        Pregunta: "¿Has tenido convulsiones recientemente?"
        Peligro de vida:

        Pregunta: "¿Crees que tu vida está en peligro debido a tu condición actual?"
        Accidentes:

            Pregunta: "¿Has tenido un accidente que ha causado daños importantes, pérdida abundante de sangre o heridas graves?"
    `;
  }
  async handleMessage(message) {
    if (!this.chat || this.conversationEnded) {
      await this.startChat();
    }

    this.questionsAsked++;
    this.conversationHistory.push({ role: "user", message });

    const messageToSend = `Paciente: ${message}`;
    const result = await this.chat.sendMessage(messageToSend);

    const response = result.response.text();

    // Lógica para finalizar la conversación automáticamente
    if (
      response.includes("Evaluaremos tu caso") ||
      this.questionsAsked >= this.maxQuestions
    ) {
      this.conversationEnded = true;
      const finalResponse = await this.processFinalResponse(response);
      return finalResponse;
    }
    this.conversationHistory.push({ role: "bot", message: response });
    return response;
  }

  async processFinalResponse(response) {
    // Ajustar las expresiones regulares para capturar el texto entre comillas o después de "Resumen de síntomas: " hasta el punto.
    const summaryMatch = response.match(
      /Resumen de síntomas:\s*(.+?)\.\s*Clasificación de gravedad:/
    );
    const classificationMatch = response.match(
      /Clasificación de gravedad:\s*(Baja|Media|Alta)\./i
    );

    const summary = summaryMatch
      ? summaryMatch[1].trim()
      : "Resumen no disponible";
    const classification = classificationMatch
      ? classificationMatch[1].trim()
      : "Indefinida";

    // Generar el informe
    console.log(summary, classification);
    const report = this.generateAlarm(summary, classification);
    await this.saveAlarmReport(report);

    // Devolver la respuesta final al usuario
    return `Gracias por responder todas las preguntas. Evaluaremos tu caso cuidadosamente y te daremos una respuesta en las próximas horas. Gracias por tu paciencia.`;
  }

  generateAlarm(summary, classification) {
    const reportDetails = this.conversationHistory
      .map((entry, index) => `#${index + 1} (${entry.role}): ${entry.message}`)
      .join("\n");
    const report = {
      patient: this.user.userId,
      chat_history: this.conversationHistory,
      alarmDescription: summary,
      ia_priority: classification,
      ia_evaluation: summary,
    };

    return report;
  }

  async saveAlarmReport(report) {
    try {
      await createNewAlarmEventHandler(report);
      console.log("Informe enviado correctamente.");
    } catch (error) {
      console.error("Error al enviar el informe:", error);
    }
  }
}

export default Alarmas;
