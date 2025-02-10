const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

var socket_user = {};


const io = new Server(server, {
    cors: {
        origin: "11.0.0.2:4000", // TODO: need to change to 0.0.0.0 or the other container name i think
        methods: ['GET', 'POST']
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data.room);
        socket_user[socket.id] = data.user;
    });

    socket.on("leave_room", (data) => {
        socket.leave(data);
        delete socket_user[socket.id];
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
});

server.listen(4001, () => {
    console.log("Server is running on port 4001");
});