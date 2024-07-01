import ListUsers from "./listUsers.js"
class Room extends ListUsers{
    constructor(name){
        // implements 
        super();
        this.messages = [];
        this.name = name;
    }

    addMessage(msg){
        this.messages.push(msg);
        return this.messages;
    }

    getMessage(){
        return this.messages;
    }

}


export default Room