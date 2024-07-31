// import Negotiation from "./negotiation.js";
import { Room } from "./roomVideoCall.js";

class ListVideoCall{
    constructor(){
        this._local = new Map();

        if(!ListVideoCall.instance){
            ListVideoCall.instance = this;
        }

        return ListVideoCall.instance
    }

    

    async createRoom(id){
         try {
             const newRoom = new Room();
             await newRoom.getData(id);
         } catch (error) {
            console.log(error.message)
         }
    }
}


const listVideoCall = new ListVideoCall();

export default listVideoCall