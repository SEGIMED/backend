import { ServerListenners, ClientListenners } from "../events/events.js";

export default (io,socket) => {
    const moveUser = (payload) => {
       const {roomName,user,target,arg} = payload;
       let newRoom = io.listRooms.getRoomByName(roomName);

       //if not is exists the room
       if(!newRoom) newRoom = io.listRooms.addRoom(roomName);
       
       //if user is exists in the room, quit of function.
       if(newRoom.isUserExists(target.id)) return;

       newRoom.joinUser(target.data,target.id);
       io.in(target.id).socketsJoin(newRoom.name);
       //print info of user is joined in the room
       io.to(roomName).emit(ClientListenners.onJoin,{user:target,roomName:roomName});
       //update listUsers in the room.
       io.to(roomName).emit(ClientListenners.listUsers,newRoom.getListUser());

       //print info in channel admin of a administrator moving a user to the room
       io.to("Admin").emit(ClientListenners.moveUser,{user,target,roomName,arg});
    }

    // const inviteUserRoom = (payload) => {
    //     const {user,roomName,target} = payload;
    //     if(user.role === 3) return
    //     let findRoom = io.listRooms.getRoomByName(roomName);
    //     if(!findRoom){
    //         findRoom = io.listRooms.addRoom(roomName);
    //         findRoom.joinUser(user,socket.id);
    //     }

    //     //send info to guest 
    //     io.to(target.id).emit(ClientListenners.invite,{user,roomName});

    //     //use event join for acept invite.
    // }

    // socket.on(ServerListenners.setMoveUser, moveUser);
    // socket.on(ServerListenners.sendInvite, inviteUserRoom);
}