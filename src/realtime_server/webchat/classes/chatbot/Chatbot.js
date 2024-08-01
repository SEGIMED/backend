import { GoogleGenerativeAI } from "@google/generative-ai";
import data from "../../helpers/chatbotData.json" assert { type: "json" };
import getMedicalEventHistoryHandler from "../../../../handlers/medicalEvent/getMedicalEventHistoryHandler.js";
import getAllAlarmsForPatientHandler from "../../../../handlers/alarmEvent/getAllAlarmsForPatientHandler.js";
import getPatientDetailsHandler from "../../../../handlers/patient/getPatientDetailsHandler.js";
const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY is required");
}
const formatCategory = (categoryName, categoryData) => {
  return `${categoryName}:\n${categoryData
    .map((item) => `Pregunta: ${item.question}\nRespuesta: ${item.answer}`)
    .join("\n\n")}\n\n`;
};

class Chatbot {
  constructor(user) {
    this.user = user;
    this.chat = null;
    this.context = "";
    this.messageLimit = 7;
    this.messageCount = 0;
  }

  async startChat() {
    let userInformation = `
      - **Nombre:** ${this.user.name}
      - **Rol:** ${this.user.role}
      - **ID de usuario:** ${this.user.userId}
    `;
    if (this.user.role === "Paciente") {
      const patientBackground = await this.getClinicalHistory();
      const patientAlarms = await this.getAlarms();
      const patientData = await this.getPatientInformation();
      userInformation += `
      - **Información del paciente:** ${patientData}
        - **Historial Médico:** ${patientBackground}
        - **Alarmas del usuario:** ${patientAlarms}
        `;
    } else if (this.user.role === "Médico") {
      const physicianInformation = `
        - **Especialidad:** ${this.user.specialty}`;

      userInformation += physicianInformation;
    }
    const systemInstruction = `
      Eres un asistente virtual para la aplicación Segimed, especializado en proporcionar ayuda según el tipo de usuario: general, paciente, o médico. Tu objetivo es responder preguntas sobre la aplicación, siempre en español, y no exceder el límite de 500 caracteres.
      **Instrucciones específicas por contexto:**
      - **General:** Responde a preguntas comunes de la aplicación y su uso general.
      - **Paciente:** Enfócate en preguntas relacionadas con la experiencia del paciente, su salud y tratamiento.
      - **Médico:** Proporciona información sobre funcionalidades y datos relevantes para médicos.
      Si recibes una pregunta que pertenece a un contexto diferente al actual, responde de la siguiente manera:
      - No inventes información que no esté en el contenido proporcionado. Tu respuesta debe basarse únicamente en las preguntas frecuentes y datos disponibles. Si la información no está en el contenido proporcionado o esta fuera del contexto de la aplicación, di: "No tengo la información que solicitas. ¿Puedo ayudarte con algo más relacionado con Segimed?".
      - Si cualquier rol pregunta algo fuera del contexto de Segimed(Salud,Medicina): "Esta pregunta no está relacionada con la aplicación Segimed. ¿Puedo ayudarte con algo más sobre Segimed?"
      - Si es una pregunta general, maneja según las instrucciones previas.
      Responde solo sobre la aplicación Segimed. Si no conoces la respuesta o es una pregunta de un rol diferente al tuyo(pacientes,medicos), di: "No puedo responder esta pregunta. ¿Tienes alguna otra duda sobre Segimed?".
       **Información actual del usuario:**
        ${userInformation}
      **Advertencia adicional:** 
      - **Solo responde en español.** No utilices ningún otro idioma bajo ninguna circunstancia.
      - **No realices traducciones automáticas ni respuestas en otros idiomas.** Todas las respuestas deben estar en español.
      - **No hagas afirmaciones o respuestas que no estén respaldadas por el contenido proporcionado.** Asegúrate de ceñirte estrictamente a la información de las preguntas frecuentes y los datos disponibles.
      - **No realices diagnósticos médicos.** No ofrezcas diagnósticos médicos ni consejos médicos específicos.
      - **No realices recomendaciones médicas.** No ofrezcas recomendaciones médicas específicas ni consejos sobre tratamientos.
      - **Siempre mantén un tono profesional y respetuoso.** Respeta a los usuarios y mantén un tono profesional en todas las respuestas.
      - **Siempre verifica la información antes de responder.** Asegúrate de que la información proporcionada sea precisa y relevante antes de responder.
      - Si la fecha te viene en un formato timestamp( ejemplo 2024-08-24T10:10:00.000Z), conviértela a un formato más legible.
      ### Preguntas Frecuentes
      #### Preguntas Generales:
      ${formatCategory("Preguntas Generales", data.preguntas_generales)}
      #### Preguntas para Médicos:
      ${formatCategory("Médicos", data.medicos)}
      #### Preguntas Médico-Paciente:
      ${formatCategory("Médico-Paciente", data.medico_paciente)}`;

    const genAI = new GoogleGenerativeAI(API_KEY);
    const genModel = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash-001",
      systemInstruction: systemInstruction,
      generationConfig: {
        maxOutputTokens: 250,
        temperature: 0.2,
        topP: 1.0,
        topK: 15,
      },
    });
    try {
      this.chat = genModel.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `Mi nombre es ${this.user.name}, y soy ${this.user.role}.`,
              },
            ],
          },
          {
            role: "model",
            parts: [{ text: "¡Hola! Soy Segi. ¿En qué puedo ayudarte?" }],
          },
        ],
      });
    } catch (error) {
      console.error("Error starting chatbot:", error);
      throw new Error("Error al iniciar la conversación.");
    }
  }

  async handleMessage(message) {
    if (!this.chat) {
      await this.startChat();
    }
    if (this.messageCount >= this.messageLimit) {
      return "Has alcanzado el límite de mensajes. Por favor, intenta nuevamente en unos segundos.";
    }
    try {
      const messageToSend = `Soy ${this.user.role}, ${message}`;

      const result = await this.chat.sendMessage(messageToSend);

      this.messageCount++;
      const response = result.response.text();
      return response;
    } catch (error) {
      console.error("Error handling message:", error);
      return "Lo siento, ocurrió un error al procesar tu mensaje.";
    }
  }
  //Paciente
  async getClinicalHistory() {
    try {
      const result = await getMedicalEventHistoryHandler(this.user.userId);
      return `El historial clínico del paciente es:\n${JSON.stringify(result)}`;
    } catch (error) {
      console.error("Error fetching clinical history:", error);
      return "No se pudo obtener el historial clínico.";
    }
  }
  async getAlarms() {
    try {
      const result = await getAllAlarmsForPatientHandler(this.user.userId);
      return `Los próximos turnos del paciente son:\n${JSON.stringify(result)}`;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return "No se pudo obtener los turnos del paciente.";
    }
  }
  async getPatientInformation() {
    try {
      const result = await getPatientDetailsHandler(this.user.userId);
      return `La información del paciente es:\n${JSON.stringify(result)}`;
    } catch (error) {
      console.error("Error geting patient information:", error);
      return "No se pudo obtener la información del paciente.";
    }
  }
  async getPhysicianInformation() {} //Información de mi médico tratante
  async getLastPreconsultations() {} //Ultimas preconsultas
  //Médico
  async getGetPatients() {} //Pacientes del médico
  async getGetSchedulings() {} //Citas del médico
  async getGetStadistics() {} //Estadisticas de los pacientes
  async getGetLastsMedicalEvent() {} //Ultimos 5 eventos médicos

  //resetear contador de mensajes
  async resetMessageCount() {
    this.messageCount = 0;
  }
}

export default Chatbot;
