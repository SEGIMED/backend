import { ServerListenners, ClientListenners } from "../events/events.js";
import WebChat from "../classes/chat/WebChat.js";

export default (io, socket) => {
  //  implements auth to join chat
  
  //handlers

  

  
  const getUsersConnected = async () => {
      const ids = Object.keys(io.users)
      const UsersConnected = {
        1:[],  // usersAdmin
        2:[],  //usersMedical
        3:[],  //usersPatient
      }
      
      for(let id of ids){
        const userData = await WebChat.getDataUser(Number(id));
        const userObject = userData.toObject()
        UsersConnected[userData.role].push({...userObject,notify:null});
      }

      socket.emit(ClientListenners.listUsersConnected,UsersConnected);
  }

  const leaveUserHandler = (payload) => {
    console.log(`The user ${socket.id} is disconnected reason: ${payload}`);
    //delete the socket instance with the user key registered in the database
    delete io.users[socket.decoded.userId];
  };

  socket.on(ServerListenners.getUsersConnected, getUsersConnected);
  socket.on(ServerListenners.onDisconnect, leaveUserHandler);
};
