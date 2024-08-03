import listUser from "../user/listUser.js";
class Chat{
    constructor({_id,users,messages}){
        this._id = _id
        this.users = users
        this.messages= messages
    }
    pushMessage(message){
        this.messages.push(message);
    }
    addUser(userId){
        this.users.push(userId);
    }

    mapper(){
        let chatGroup = null;
        if(listUser.getUser(this.users[0]).role === "Médico" && listUser.getUser(this.users[1]).role === "Médico") chatGroup = "Médico"
        else chatGroup = "Paciente"
        let chatObj = {
            _id: this._id,
            users: this.users,
            messages: this.messages,
            chatType: chatGroup
          };
        return chatObj;
    }

}


export default Chat
