import { ClientListenners, ServerListenners } from "../events/events.js";
import {
  getOrCreateChatbot,
  removeChatbot,
} from "../classes/chatbot/ChatbotManager.js";

export const registerChatbotHandler = (io, socket) => {
  const sendChatBotMessage = async (payload) => {
    const { message } = payload;
    const chatbot = getOrCreateChatbot(socket.decoded);
    const response = await chatbot.handleMessage(message);
    socket.emit(ServerListenners.sendChatBotMessage, response);
  };

  const createChatbot = async () => {
    const chatbot = getOrCreateChatbot(socket.decoded);
    await chatbot.startChat(); // Inicializa el chat si no está iniciado
    socket.emit(ClientListenners.updateNewChat, { message: "Chat iniciado." });
    // Resetea el contador de mensajes cada minuto;
  };
  // Resetea el contador de mensajes
  const resetMessageCount = async () => {
    const chatbot = getOrCreateChatbot(socket.decoded);
    setTimeout(() => {
      chatbot.resetMessageCount();
    }, 15000);
  };
  // Enviar informacion de un paciente
  const sendPatientInfo = async (payload) => {
    console.log("llego", payload);

    const { message } = payload;
    const chatbot = getOrCreateChatbot(socket.decoded);
    chatbot.sendPatientInfo(message);
  };

  const destroyChatbot = async () => {
    removeChatbot(socket.decoded);
  };

  socket.on(ClientListenners.sendUserChatBotMessage, sendChatBotMessage);
  socket.on(ServerListenners.createChatBot, createChatbot);
  socket.on(ServerListenners.destroyChatBot, destroyChatbot);
  socket.on(ServerListenners.resetMessageCount, resetMessageCount);
  socket.on(ServerListenners.sendPatientInfo, sendPatientInfo);
};
