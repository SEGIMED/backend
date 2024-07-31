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

    

    async findOrCreateRoom(id){
         try {
            if(!this._local.has(id)){
            const newRoom = new Room();
            const data = await newRoom.getData(id);
            this._local.set(data.id,data)
            }
            return this._local.get(id)

         } catch (error) {
            console.log(error.message)
         }
    }
}


const listVideoCall = new ListVideoCall();

export default listVideoCall