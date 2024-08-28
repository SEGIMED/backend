import  {Room}  from "./roomVideoCall.js";

class VideoCall{
    constructor(){
        this.rooms = new Map();
        if(!VideoCall.instance){
            VideoCall.instance = this;
        }

        return VideoCall.instance
    }


    joinRoom(consultId,dataUser){
        if(this.rooms.has(consultId)){
             const findRoom = this.rooms.get(consultId);
             findRoom.join(dataUser);
             return findRoom 
        } else {
             const newRoom = new Room(consultId);
             this.rooms.set(consultId,newRoom);
             newRoom.join(dataUser);

             return newRoom       
             }
    }

    setState({consultId,state},userData){
        if(this.rooms.has(consultId)){
           const findRoom = this.rooms.get(consultId);
           return findRoom.setState(userData,state);
        } else {
            this.joinRoom(consultId,userData);
            return this.setState({consultId,state},userData);
        }
    }

    getDataRoom(id){
        return this.rooms.get(id);
    }

}


export default new VideoCall()