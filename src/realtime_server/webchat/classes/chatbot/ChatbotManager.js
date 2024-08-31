import Chatbot from "./Chatbot.js";
import Alarmas from "./Alarmas.js";

const chatbots = {};
// Función para obtener o crear un Chatbot para un usuario
export const getOrCreateChatbot = (user, type = "Chatbot") => {
  // Si el usuario no tiene chatbots, creamos el objeto para almacenar sus chatbots
  if (!chatbots[user.userId]) {
    chatbots[user.userId] = {};
  }

  // Si no existe el chatbot del tipo solicitado, lo creamos
  if (!chatbots[user.userId][type]) {
    if (type === "Alarmas") {
      chatbots[user.userId][type] = new Alarmas(user);
    } else {
      chatbots[user.userId][type] = new Chatbot(user);
    }
  }
  return chatbots[user.userId][type];
};

// Función para obtener un Chatbot específico si ya existe
export const getChatbot = (userId, type = "Chatbot") => {
  return chatbots[userId]?.[type] || null;
};

// Función para eliminar un Chatbot específico por tipo
export const removeChatbot = (userId, type = "Chatbot") => {
  if (chatbots[userId] && chatbots[userId][type]) {
    delete chatbots[userId][type];

    // Si ya no hay chatbots para este usuario, eliminamos la entrada del usuario
    if (Object.keys(chatbots[userId]).length === 0) {
      delete chatbots[userId];
    }
  }
  console.log(chatbots);
};
