// import ListVideoCall from "../classes/videoCall/listVideoCall.js";

import VideoCall from "../classes/videoCall/VideoCall.js";
export default (io,socket) => {
    // const createOffer = async (data) => {
    //     const dataRoom = await ListVideoCall.findOrCreateRoom(data.id);
    //     ListVideoCall.setOfferRoomById(data.id);
    //     const {userId} = socket.decoded
    //     const targetID = dataRoom.users.find(id => id !== userId);
    //     if(io.users[targetID]) io.users[targetID].emit("onOffer",data.offer);
    // }

    // const createAsw = async(data) => {
    //         const dataRoom = await ListVideoCall.findOrCreateRoom(data.id);
    //         ListVideoCall.setAswRoomById(data.id);
    //         const {userId} = socket.decoded
    //         const targetID = dataRoom.users.find(user => user !== userId);
    //         if(io.users[targetID]) io.users[targetID].emit("onAsw",data.asw);
    // }

    // const userState = async (data) => {
    //     const {consultId,state} = data; 
    //     const {userId,role} = socket.decoded
    //     const findRoom = await ListVideoCall.findOrCreateRoom(consultId);
    //     let targetId = null;
    //     if(role==="Médico"){
    //         findRoom.physician.state = state;
    //         targetId = findRoom.patient.id
    //     } else {
    //         findRoom.patient.state = state;
    //         targetId = findRoom.physician.id
    //     }

    //     if(io.users[targetId]){
    //         io.users[targetId].emit("updateRoom",findRoom)
    //     }
    //     socket.emit("updateRoom",findRoom);
    // }
    // const newCandidate = async(data) => {
    //     const dataRoom = await ListVideoCall.findOrCreateRoom(data.id);
    //     const candidate = data.candidate;
    //     const {userId} = socket.decoded
    //     const targetID = dataRoom.users.find(user => user !== userId);
    //     if(io.users[targetID]){
    //         io.users[targetID].emit("newCandidate",candidate);
    //     }

    // }
    // const joinRoom = async (consultId) => {

    //     try {
    //         if(!consultId) throw new Error('Error, no recibio el id de la consulta');
    //         const data = await ListVideoCall.findOrCreateRoom(consultId);
    //         const myId = socket.decoded.userId;
    //         data.setUserState(myId,true);
    //         const target = data.users.find(user => user !== myId);
    //         if(io.users[target]){
    //             io.users[target].emit('dataRoom',data);
    //         }
    //         socket.emit('dataRoom',data)
    //     } catch (error) {
    //         console.log(error.message);
    //     }

    // }


    
    /*
        Modificar. 

        1- Evento para entrar a la sala.
        2- Evento para salir, sacar de la sala.
        3- Evento para mostrar la lista de usuarios.
        4- Evento para iniciar la consulta (solo si estan los 2 usuarios). (offer)
        5- Evento para contestar la llamada (asw)
        6- Evento para finalizar. ( Limpiar la data local);
    */

     const sendUpdateTarget = (data) => {
        let userId
        if(socket.decoded.role === 'Médico'){
             userId = data?.patient?.userId;
             data.target = data?.physician;
        } else {
             userId = data?.physician?.userId;
             data.target = data?.patient;
        }
        if(io.users[userId]) io.users[userId].emit('updateStateRoom',data);

     }

     const handleOnJoin = (data) => {
        const {userId,role,name,lastname,avatar} = socket.decoded
        const userData = {userId,role,name,lastname,avatar}
        const Room = VideoCall.joinRoom(data,userData);
        if(userData.role === 'Médico'){
            Room.target =  Room?.patient
        } else {
            Room.target =  Room?.physician
        }
        socket.emit('updateStateRoom',Room);
        sendUpdateTarget(Room)
     }


     const handleGetUpdateState = (data) =>{
        const consultId = data;
        const {role} = socket.decoded;
        const Room = VideoCall.getDataRoom(consultId);
        if(Room){
            if(role === 'Médico'){
                Room.target  = Room?.patient
            } else {
                Room.target = Room?.physician
            }
            socket.emit("updateStateRoom",Room)
        }
     }

     const handleSetState = ({id,state})=>{
    
        const {userId,role,name,lastname,avatar} = socket.decoded
        const userData = {userId,role,name,lastname,avatar}
        
       const Room = VideoCall.setState({consultId:id,state},userData);
       
       if(role === 'Médico') {
          Room.target = Room.patient;
       } else {
          Room.target = Room.physician;
       }

       socket.emit('updateStateRoom',Room);
       sendUpdateTarget(Room)

     }

     const handleVideoCall =  (data) => {
        const {role} = socket.decoded;
        const {consultId,message} = data;
        const room = VideoCall.getDataRoom(consultId);
        let targetId
        if(role === 'Médico') targetId = room.patient.userId;
        else targetId = room.physician.userId;
        if(io.users[targetId]) io.users[targetId].emit('videoCall',data);
     }

     const handleCandidateIce = (data) => {
        const {consultId, candidate} = data;
        const {role} = socket.decoded;
        const room = VideoCall.getDataRoom(consultId);
        let targetId
        if(role === 'Médico') targetId = room.patient.userId;
        else targetId = room.physician.userId;
        if(io.users[targetId]) io.users[targetId].emit('newCandidate',candidate);
     }


    socket.on('newCandidate',handleCandidateIce);
    socket.on("videoCall",handleVideoCall)
    socket.on("setState", handleSetState)
    socket.on("joinRoom", handleOnJoin);
    socket.on("getUpdateStateRoom",handleGetUpdateState)
    // socket.on("sendAsw", );
    // socket.on('sendOffer',);
    // socket.on('newCandidate',newCandidate);
    // socket.on('userState',userState);
}
