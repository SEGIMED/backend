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
            const targetID = dataRoom.users.find(user => user.id !== userId);
            if(io.users[targetID.id]) io.users[targetID.id].emit("onAsw",data.asw);
    }

    const userState = async (data) => {
        console.log('entro a la funcion')
        const {consultId,state} = data; 
        const {userId,role} = socket.decoded
        const findRoom = await ListVideoCall.findOrCreateRoom(consultId);
        let targetId = null;
        if(role==="Médico"){
            findRoom.physician.state = state;
            targetId = findRoom.patient.id
        } else {
            findRoom.patient.state = state;
            targetId = findRoom.physician.id
        }
        console.log(findRoom)

        if(io.users[targetId]){
            io.users[targetId].emit("updateRoom",findRoom)
        }
        socket.emit("updateRoom",findRoom);
    }
    const newCandidate = async(data) => {
        console.log(data)
        const dataRoom = await ListVideoCall.findOrCreateRoom(data.id);
        console.log(dataRoom)
        const candidate = data.candidate;
        const {userId} = socket.decoded
        const targetID = dataRoom.users.find(user => user.id !== userId);
        if(io.users[targetID.id]){
            io.users[targetID.id].emit("newCandidate",candidate);
        }

    }
    const joinRoom = async (consultId) => {

        try {
            if(!consultId) throw new Error('Error, no recibio el id de la consulta');
            const data = await ListVideoCall.findOrCreateRoom(consultId);
            const myId = socket.decoded.userId;
            data.setUserState(myId,true);
            const target = data.users.find(user => user.id !== myId);
            console.log('el valor de targetId',target);
            if(io.users[target.id]){
                io.users[target.id].emit('dataRoom',data);
            }
            socket.emit('dataRoom',data)
        } catch (error) {
            console.log(error.message);
        }

    }
    
    /*
        Modificar. 

        1- Evento para entrar a la sala.
        2- Evento para salir, sacar de la sala.
        3- Evento para mostrar la lista de usuarios.
        4- Evento para iniciar la consulta (solo si estan los 2 usuarios). (offer)
        5- Evento para contestar la llamada (asw)
        6- Evento para finalizar. ( Limpiar la data local);
    */
    socket.on("joinRoom", joinRoom);
    socket.on("sendAsw",createAsw);
    socket.on('sendOffer',createOffer);
    socket.on('newCandidate',newCandidate);
    socket.on('userState',userState);
}