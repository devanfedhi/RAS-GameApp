import { Server } from 'socket.io';
import connections from './socket';

const setupSocketServer = (server: any): void => {
    const cors_origin = process.env.NODE_ENV === 'prod' ? "https://www.otterhello.live" : "http://localhost:4000";

    const io = new Server(server, {
        cors: {
            origin: cors_origin,
            methods: ['GET', 'POST']
        }
    });

    connections(io);
};

export default setupSocketServer;