import { ClientListenners, ServerListenners } from "../events/events.js";
import Webchat from "../classes/chat/WebChat.js";

export default (io,socket) => {
    
    const sendChatMessage = async (payload) =>{
        // register a new message in database
        const targetId = payload.id;
        const message = payload.message;
        const {userId} = socket.decoded
        const data =  Webchat.sendChatMessage(userId, targetId,message);
        const target= Webchat.listUser.getUser(targetId)
        const userObj= Webchat.listUser.getUser(userId)
        data.chat.target = target

        socket.emit(ClientListenners.updateMessage,data);
        if(io.users[targetId]){
            data.chat.target =userObj
                io.users[targetId].emit(ClientListenners.updateNewChat, data);
            
        }
    }

    const createChat = async(payload) => {
        const {id} = payload; 
        const {userId} = socket.decoded;
        let data =  Webchat.findOrCreateChat(userId,id);
        let target = Webchat.listUser.getUser(id);
        data.chat.target = target
        socket.emit(ClientListenners.updateNewChat,data);
    }

    const persistChat = async(payload,callback) => {
        //crear la persistencia del chat.
       const newChat = await Webchat.listChat.saveInDatabase(payload);
       const target = Webchat.listUser.getUser(payload.chat.target.userId);
       const userobj = Webchat.listUser.getUser(socket.decoded.userId);
       newChat.target = target;
       callback(newChat);
       newChat.target = userobj
       if(io.users[target.userId]){
         io.users[target.userId].emit("updateNewChat",{chat: newChat});
       }
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
        const findChat= Webchat.listChat.getChat(chat.users[0],chat.users[1])
        if(findChat){
             await findChat.markedMessages(unseenMessages)    
             let newData = Webchat.listChat.getChat(chat.users[0],chat.users[1]);
             let userobj = Webchat.listUser.getUser(socket.decoded.userId);

             newData = newData.mapper()
             newData.target = chat.target
             cb (newData)
             newData.target = userobj
             if(io.users[chat.target.userId]){
                io.users[chat.target.userId].emit("updateNewChat",{chat: newData})
             }
        }
        

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