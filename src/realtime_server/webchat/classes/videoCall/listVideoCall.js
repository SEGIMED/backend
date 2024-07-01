import Negotiation from "./negotiation.js";
class ListVideoCall{
    constructor(){
        this._local = new Map();
    }

    addVideoCall(user){ //generate a new room.
        const target = user;
        const key = this.generateKey([user.userId, target.userId]);
        const negotiation = new Negotiation();
        if(user?.offer){
            negotiation.addOffer(user);
        } 
        if(user?.answer){
            negotiation.addAnswer(user);
        }
        this._local.set(key,negotiation);
        
    }

    getVideoCall(users){
        const key = this.generateKey(users);
        return this._local.get(key);
    }


    updateRoom(users,data){ // update a data of the room.
        const key = this.generateKey(users);
        this._local.set(key,data);
        return this._local.get(key);
    }
    
    generateKey(users){ //generate a key to get a room of users in video call.
        const key = users.sort().join("-");
        return key;
    }

    
}