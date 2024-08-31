import { ClientListenners, ServerListenners } from "../events/events.js";
import {
  getOrCreateChatbot,
  removeChatbot,
} from "../classes/chatbot/ChatbotManager.js";

export const registerChatbotHandler = (io, socket) => {
  const sendChatBotMessage = async (payload) => {
    const { message, type = "Chatbot" } = payload;
    const chatbot = getOrCreateChatbot(socket.decoded, type);
    const response = await chatbot.handleMessage(message); // Maneja el mensaje

    const emitEvent =
      type === "Alarmas"
        ? ServerListenners.sendAlarmasBotMessage
        : ServerListenners.sendChatBotMessage;

    socket.emit(emitEvent, response);

    // Verifica si la conversación ha terminado (en caso del chatbot de tipo "Alarmas")
    if (type === "Alarmas" && response.includes("Evaluaremos tu caso")) {
      removeChatbot(socket.decoded.userId, type);
    }
  };

  const createChatbot = async (payload = {}) => {
    const { type = "Chatbot" } = payload;
    const chatbot = getOrCreateChatbot(socket.decoded, type);
    await chatbot.startChat(); // Inicia el chat
    socket.emit(ClientListenners.updateNewChat, { message: "Chat iniciado." });
  };

  const resetMessageCount = async (payload = {}) => {
    const { type = "Chatbot" } = payload;
    const chatbot = getOrCreateChatbot(socket.decoded, type);
    setTimeout(() => {
      chatbot.resetMessageCount(); // Resetea el contador de mensajes
    }, 15000);
  };

  const sendPatientInfo = async (payload) => {
    const { message, type = "Chatbot" } = payload;
    const chatbot = getOrCreateChatbot(socket.decoded, type);
    chatbot.sendPatientInfo(message); // Envía la información del paciente al chatbot
  };

  const destroyChatbot = async (payload = {}) => {
    const { type = "Chatbot" } = payload;
    removeChatbot(socket.decoded.userId, type); // Elimina solo el chatbot del tipo especificado
  };

  // Registra los eventos de socket
  socket.on(ClientListenners.sendUserChatBotMessage, sendChatBotMessage);
  socket.on(ServerListenners.createChatBot, createChatbot);
  socket.on(ServerListenners.destroyChatBot, destroyChatbot);
  socket.on(ServerListenners.resetMessageCount, resetMessageCount);
  socket.on(ServerListenners.sendPatientInfo, sendPatientInfo);
};
