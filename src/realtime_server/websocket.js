import { Server } from "socket.io";
import configureSocket from "./registerEvents.js";
import { verifyAndRefreshToken } from "../utils/JWTUtils.js";

const verifyToken = async (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    console.log(`Authentication request from ${socket.handshake.address}`);
    try {
      const { newAccessToken, decodedToken } = await verifyAndRefreshToken(
        socket.handshake.query.token,
        socket.handshake.query.refreshToken
      );
      socket.decoded = decodedToken;
      if (newAccessToken) {
        socket.emit("newAccessToken", { newAccessToken });
      }
      next();
    } catch (error) {
      console.error(error.message);
      return next(new Error(error.message));
    }
  } else {
    console.log(`Authentication error from ${socket.handshake.address}`);
    next(new Error("Authentication error"));
  }
};

export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // El cliente que permites
      methods: ["GET", "POST"], // Métodos HTTP permitidos
      allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
      credentials: true, // Permite cookies y otros datos de autenticación
    },
  });

  // Crear namespaces
  const roomConsulting = io.of("/room-consult").use(verifyToken);
  const roomWork = io.of("/room-work").use(verifyToken);
  const roomSupport = io.of("/room-support"); // Asegúrate de que el nombre del namespace esté escrito correctamente
  roomConsulting.users = {};
  roomWork.users = {};
  roomSupport.users = {};
  // Configurar manejadores de eventos
  configureSocket(roomConsulting);
  configureSocket(roomWork);
  configureSocket(roomSupport);
};
