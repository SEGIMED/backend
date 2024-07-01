//* Socket.io configuratio in db
// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const sequelize = require('./config/database');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);


// sequelize.authenticate();

//*Conection event
io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    // Handling of specific events of the connected client
    socket.on('eventoCliente', (data) => {
        // Code for processing customer data
    });
});

//*Disconect event
io.on('disconnect', (socket) => {
    console.log('Usuario desconectado:', socket.id);
});

//*Push event 
io.emit('eventoServidor', { data: 'Mensaje de notificación' });
