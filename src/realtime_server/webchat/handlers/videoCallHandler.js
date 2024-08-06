import ListVideoCall from "../classes/videoCall/listVideoCall.js";

export default (io,socket) => {
    const createOffer = async (data) => {
        const dataRoom = await ListVideoCall.findOrCreateRoom(data.id);
        ListVideoCall.setOfferRoomById(data.id);
        const {userId} = socket.decoded
        const targetID = dataRoom.users.find(id => id !== userId);
        if(io.users[targetID]) io.users[targetID].emit("onOffer",data.offer);
    }

    const createAsw = async(data) => {
            const dataRoom = await ListVideoCall.findOrCreateRoom(data.id);
            ListVideoCall.setAswRoomById(data.id);
            const {userId} = socket.decoded
            const targetID = dataRoom.users.find(id => id !== userId);
            if(io.users[targetID]) io.users[targetID].emit("onAsw",data.asw);
    }

    const newCandidate = async(data) => {
        const dataRoom = await ListVideoCall.findOrCreateRoom(data.id);
        const idRoom = data.id;
        const candidate = data.candidate;
        const {userId} = socket.decoded
        ListVideoCall.setNewCandidate(idRoom,{userId,candidate});
        const targetID = dataRoom.users.find(id => id !== userId);
        if(io.users[targetID]){
            io.users[targetID].emit("newCandidate",candidate);
        }

    }
    const joinRoom = async (consultId, cb) => {
        try {
            if(!consultId) throw new Error('Error, no recibio el id de la consulta');
            const data = await ListVideoCall.findOrCreateRoom(consultId) 
            if(data ) cb(data)
            

            // usar callback para modificar entregar la informacion al front.


        } catch (error) {
            console.log(error.message);
        }

    }
    

    socket.on("joinRoom", joinRoom);
    socket.on("sendAsw",createAsw);
    socket.on('sendOffer',createOffer);
    socket.on('newCandidate',newCandidate)
}