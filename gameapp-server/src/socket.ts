import { get } from "http";
import { CheckersGame } from "./classes/CheckersGame";
import { Player } from "./classes/Player";

interface SocketUser {
    [key: string]: string;
}


const socket_user: SocketUser = {};
let checkersGames: { [key: string]: CheckersGame } = {};
let players: { [key: string]: Player } = {};


function getGames() {
    return Object.values(checkersGames).map((game: CheckersGame) => {
        return {
            gameName: game.getGameName(),
            currentNumPlayers: game.getPlayers().length,
            playerNames: game.getPlayerNames(),
            maxPlayers: game.getMaxPlayers()
        }
    });
}

const connections = (io: any): void => {
    io.on("connection", (socket: any) => {
        console.log(`User connected to server: ${socket.id}`);

        socket.on("checkers-create-game", (data: { gameName: string, name: string }) => {
            // socket.join(`checkers-${data.gameName}`);

            let game = new CheckersGame(data.gameName);
            let player = new Player(data.name, socket.id, data.gameName);
            game.addPlayer(player);

            checkersGames[data.gameName] = game;
            players[socket.id] = player;

            const games = getGames();

            console.log(games);

            socket.broadcast.emit("send-games", { games });
            
        });

        socket.on("checkers-join-game", (data: { gameName: string, name: string }) => {
            // socket.join(`checkers-${data.gameName}`);

            let player = new Player(data.name, socket.id, data.gameName);

            // TODO: Client response if game does not exist
            if  (!checkersGames[data.gameName]) {
                socket.emit("checkers-join-game-error", { message: "Game does not exist." });
                return;
            }

            let game = checkersGames[data.gameName];

            let currentGamePlayers = game.getPlayers();

            // TODO: Client response if player is already in the game
            for (let i = 0; i < currentGamePlayers.length; i++) {
                if (currentGamePlayers[i].getSocketId() === player.getSocketId()) {
                    socket.emit("checkers-join-game-error", { message: "You are already in this game." });
                    return;
                }
            }

            players[socket.id] = player;
            game.addPlayer(player);

            const games = getGames();

            console.log(games);

            socket.broadcast.emit("send-games", { games });

            // attempt a game start
            game.startGame();
            
        });

        socket.on("get-games", () => {
            const games = getGames();
            socket.emit("send-games", { games });
        });

        socket.on("join_room", (data: { room: string, user: string }) => {
            socket.join(data.room);
            socket_user[socket.id] = data.user;
        });

        socket.on("leave_room", (data: string) => {
            socket.leave(data);
            delete socket_user[socket.id];
        });

        socket.on("send_message", (data: { room: string, message: string }) => {
            socket.to(data.room).emit("receive_message", data);
        });

        socket.on("disconnect", (reason: string) => {
            console.log(`User disconnected from server: ${socket.id} because of ${reason}`);

            if (players[socket.id]) {
                let player = players[socket.id];

                delete checkersGames[player.getGameId()];

                const games = getGames();

                console.log(games);

                socket.broadcast.emit("send-games", { games });
            }

        });
    });
}

export default connections;