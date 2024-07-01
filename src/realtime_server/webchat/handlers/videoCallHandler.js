


export default (io,socket) => {
    const createOffer = (data,callback) => {
        console.log(data);
    }

    socket.on('sendOffer',createOffer);
}