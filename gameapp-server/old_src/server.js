const { Server } = require('socket.io');
const connections = require('./socket');

const setupSocketServer = (server) => {
    const cors_origin = process.env.NODE_ENV === 'prod' ? "https://www.otterhello.live" : "http://localhost:4000";

    const io = new Server(server, {
        cors: {
            origin: cors_origin,
            methods: ['GET', 'POST']
        }
    });

    connections(io);

};


module.exports = setupSocketServer;