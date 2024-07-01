
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
        let chatObj = {
            _id: this._id,
            users: this.users,
            seenMessages: this.messages.filter((message) => message?.state),
            unseenMessages: this.messages.filter((message) => !message?.state)
          };
        return chatObj;
    }

}


export default Chat
