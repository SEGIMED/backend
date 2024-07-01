import { ClientListenners, ServerListenners } from "../events/events.js";
import WebChat from "../classes/chat/WebChat.js";


export default (io, socket) => {

    // handler to get the list of users in a room


    const createGroupChat = async (payload) => {
      const {id,roomName} = payload;
      const dataUser = await WebChat.getDataUser(id);
      if(dataUser.role === 3) return // if user role is 3 quit of function.
      const chat = await WebChat.createGroupChat(roomName,id);
      socket.emit(ClientListenners.updateChatGroup,chat);
      socket.join(roomName);
    }

    const deleteGroupChat = async (payload) => {
        const {id,roomId} = payload;
        const response = await WebChat.deleteGroupChat(roomId,id);
        io.to(roomId).emit(ClientListenners.deleteGroup,roomId);
      for(let s of response.users){ //quit all clients in a room.
        if(io.users[s]){
          io.users[s].leave(roomId);
        }
      }
    }

    const inviteGroupChat = async (payload) =>{ //
      const {id,roomId,target} = payload;
      const notify = await WebChat.createNotify(target,id,{
        message:"you have received an invitation",
        roomId
      });
      if(io.users[target]){
        io.users[target].emit(ClientListenners.updateNotify,notify);
      }
    }

    const joinGroupChat = async (payload) => {
      const {id,roomId} = payload
      const group =  await WebChat.joinGroupChat(roomId,id);
      if(group) socket.emit(ClientListenners.listGroup,group);
    }



    socket.on(ServerListenners.joinGroupChat,joinGroupChat)
    socket.on(ServerListenners.sendInvite,inviteGroupChat);
    socket.on(ServerListenners.createGroupChat,createGroupChat);
    socket.on(ServerListenners.setCloseRoom,deleteGroupChat);
};
