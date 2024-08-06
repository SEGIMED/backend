import Chatbot from "./Chatbot.js";

const chatbots = {}; // Almacena instancias de chatbots por ID de usuario

// Función para obtener o crear un Chatbot para un usuario
export const getOrCreateChatbot = (user) => {
  if (!chatbots[user.userId]) {
    chatbots[user.userId] = new Chatbot(user);
  }
  return chatbots[user.userId];
};

// Función para obtener un Chatbot específico si ya existe
export const getChatbot = (userId) => {
  return chatbots[userId] || null;
};

// Función para eliminar un Chatbot
export const removeChatbot = (userId) => {
  if (chatbots[userId]) {
    delete chatbots[userId];
  }
};
