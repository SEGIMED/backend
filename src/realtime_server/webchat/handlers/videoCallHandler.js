

import ListVideoCall from "../classes/videoCall/listVideoCall.js";

export default (io,socket) => {
    const createOffer = (data,callback) => {
        console.log(data);
    }

    const joinRoom = async (consultId, cb) => {
        try {
            console.log("esto es callback en handler",cb)
            if(!consultId) throw new Error('Error, no recibio el id de la consulta');
            const data = await ListVideoCall.findOrCreateRoom(consultId) 
            console.log("esto es data", data)
            if(data ) cb(data)
            

            // usar callback para modificar entregar la informacion al front.


        } catch (error) {
            console.log(error.message);
        }

    }

    socket.on("joinRoom", joinRoom);
    socket.on('sendOffer',createOffer);
}