

const socket_user = {};
let checkersGames = {};

const connections = (io) => {
    io.on("connection", (socket) => {
        console.log(`User connected to server: ${socket.id}`);

        socket.on("checkers-create-game", (data) => {
            console.log(checkersGames);
            socket.join(`checkers-${data.gameName}`);
        });

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

        socket.on("disconnect", (reason) => {
            console.log(`User disconnected from server: ${socket.id} because of ${reason}`);
        });
    });
}

module.exports = connections;