import { ClientListenners, ServerListenners } from "../events/events.js";
import Webchat from "../classes/chat/WebChat.js";
import listChats from "../classes/chat/listChats.js";
import listUser from "../classes/user/listUser.js";

export default (io,socket) => {
    
    const sendChatMessage = async (payload) =>{
        // register a new message in database
        const targetId = payload.id;
        const message = payload.message;
        const {userId} = socket.decoded
        const data =  Webchat.sendChatMessage(userId, targetId,message);
        const target= listUser.getUser(targetId)
        const userObj= listUser.getUser(userId)
        data.chat.target = target

        socket.emit(ClientListenners.updateMessage,data);
        if(io.users[targetId]){
            data.chat.target =userObj
            if(data.isNewChat){
                io.users[targetId].emit(ClientListenners.updateNewChat, data);
            } else {
                io.users[targetId].emit(ClientListenners.updateMessage, data);
            }
        }
    }

    const createChat = async(payload) => {
        const {id} = payload; 
        const {userId} = socket.decoded;
        const chat =  Webchat.findOrCreateChat(userId,id);
        socket.emit(ClientListenners.updateNewChat,chat);
    }

    const persistChat = async(payload,callback) => {
        //crear la persistencia del chat.
       const newChat = await Webchat.listChat.saveInDatabase(payload);
       const target = Webchat.listUser.getUser(payload.chat.target.userId);
       newChat.target = target;
       callback(newChat);
    }

    const getChatMessage = async(payload) => {
        // const chat = await Webchat.getChatById(payload);
        // socket.emit("messages",chat);
    }

    //     //handler print message to Room.
    //     const getChatMessageHandler = async (payload) => {
    //         const { chatId } = payload;
    //         const chat = await Webchat.getChatById(chatId);
    //         socket.emit(ClientListenners.updateChatMessages, chat);
    //     }
        

    //  //handler mark of message state to true;

    const messageSeenHandler = async (data, cb) => {
        const {unseenMessages, chat} = data
        const findChat= listChats.getChat(chat.users[0],chat.users[1])
        if(findChat){
             await findChat.markedMessages(unseenMessages)    
        }
        const newData = Webchat.findOrCreateChat(chat.users[0], chat.users[1])
        cb (newData) 
    };
    


    // const sendGroupMessage = async(payload) => {
    //     const {message, idRoom, id} = payload;
    //     const group = await Webchat.sendMessageGroup(id,idRoom,message);
    //     io.to(idRoom).emit(ClientListenners.updateChatGroupMessages,group);
    // }
    // socket.on(ServerListenners.sendGroupMessage, sendGroupMessage)
    // socket.on(ServerListenners.messageSeen,messageSeenHandler);
    socket.on(ServerListenners.sendMessage,sendChatMessage);
    socket.on(ServerListenners.createChat,createChat)
    socket.on("getChatMessage",getChatMessage);
    socket.on("persistChat",persistChat)
    socket.on("markedMessages",messageSeenHandler);
    // socket.on(ServerListenners.getChatMessages,getChatMessageHandler);


}