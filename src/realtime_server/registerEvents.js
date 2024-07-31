import registerConnectHandler from "./webchat/handlers/userConnectHandler.js";
import registerMessageHandler from "./webchat/handlers/messageHandler.js";
import registerRoomsHandler from "./webchat/handlers/roomHandlers.js";
import registerAdminActionHandler from "./webchat/handlers/adminActionHandler.js";
import Webchat from "./webchat/classes/chat/WebChat.js";
import { ServerListenners, ClientListenners } from "./webchat/events/events.js";
import registerVideoCallHandler from "./webchat/handlers/videoCallHandler.js";
import { registerChatbotHandler } from "./webchat/handlers/chatbotHandler.js";
const Roles = {
  Paciente: "Paciente",
  Admin: "Admin",
  Médico: "Médico",
  Invitado: "Invitado",
};

//configure handlers
export default (io) => {
  //join listenners when a new client connected

  const onConnection = async (socket) => {
    const { role, userId } = socket.decoded;
    let registred = false;
    //register socket with key equals to userId in the instance of socket.io
    io.users[userId] = socket;
    //get data user in database and if isn't exists in database the function register the user.
    // const dataUser = await Webchat.getDataUser(socket.decoded);
    let dataUser = Webchat.listUser.getUser(userId);
    if (!dataUser) {
      dataUser = await Webchat.listUser.getUserMongoDB(userId);
      if (!dataUser) {
        // only if not are in database of mongoDB. use method listUser.save(); to register in database.
        dataUser = await Webchat.listUser.registerUser(socket.decoded);
        registred = true;
      } else Webchat.listUser.addUser(dataUser);
      //emit alls notify the user.
      socket.emit(ClientListenners.updateNotify, dataUser);
    }

    //get data of chats the user in database.

    // const dataChats = await Webchat.getAllChatUser(socket.decoded);
    let chats = Webchat.listChat.getAllChatByUserId(dataUser.userId);
    if (chats.length) {
      chats = chats.map((chat) => {
        const newChat = chat.mapper();
        let target = newChat.users.find((user) => user != dataUser.userId);
        target = Webchat.listUser.getUser(target);
        newChat.target = target;
        return newChat;
      });
    }

    socket.emit(ClientListenners.getHistoryChats, chats);
    //others event listenners
    if (role !== Roles.Paciente && role !== Roles.Invitado) {
      //emit alls chats of group the user in database.
      // const dataChatsGroup = await Webchat.getAllChatGroupUser(socket.decoded);
      // socket.emit(ClientListenners.listGroup, dataChatsGroup);

      //register listenner in the socket.
      registerAdminActionHandler(io, socket);
      registerRoomsHandler(io, socket);
    }
    registerChatbotHandler(io, socket);
    registerMessageHandler(io, socket);
    registerConnectHandler(io, socket);
    registerVideoCallHandler(io, socket);

    //if the user isn't exists in mongo database.
    if (registred) {
      Webchat.listUser.saveUserDatabase(userId);
    }
  };

  io.on(ServerListenners.onConnected, onConnection);
};
