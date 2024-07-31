

import ListVideoCall from "../classes/videoCall/listVideoCall.js";

export default (io,socket) => {
    const createOffer = (data,callback) => {
        console.log(data);
    }

    const joinRoom = async (consultId, callback) => {
        try {
            if(!consultId) throw new Error('Error, no recibio el id de la consulta');
            ListVideoCall.createRoom(consultId);
            // buscar la informacion.

            // crear la sala. 

            // usar callback para modificar entregar la informacion al front.


        } catch (error) {
            console.log(error.message);
        }

    }

    socket.on("joinRoom", joinRoom);
    socket.on('sendOffer',createOffer);
}