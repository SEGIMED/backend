import { Server } from "socket.io";
import configureSocket from "./registerEvents.js";
import jwt from "jsonwebtoken";

const { ACCESS_TOKEN_SECRET } = process.env;

const verifyToken = (socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, ACCESS_TOKEN_SECRET, function(err, decoded) {
            if (err) {
                console.log(`Authentication error from ${socket.handshake.address}`);
                return next(new Error('Authentication error'));
            }
            socket.decoded = decoded;
            next();
        });
    } else {
        console.log(`Authentication error from ${socket.handshake.address}`);
        next(new Error('Authentication error'));
    }
};

export default (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*", // El cliente que permites
            methods: ["GET", "POST"], // Métodos HTTP permitidos
            allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
            credentials: true // Permite cookies y otros datos de autenticación
        }
    });

    // Crear namespaces
    const roomConsulting = io.of('/room-consult').use(verifyToken);
    const roomWork = io.of('/room-work').use(verifyToken);
    const roomSupport = io.of('/room-support'); // Asegúrate de que el nombre del namespace esté escrito correctamente

    roomConsulting.users = {}
    roomWork.users = {}
    roomSupport.users = {}
    // Configurar manejadores de eventos
    configureSocket(roomConsulting);
    configureSocket(roomWork);
    configureSocket(roomSupport);
};




