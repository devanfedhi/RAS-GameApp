import { get } from "http";
import { CheckersGame } from "./classes/CheckersGame";
import { Player } from "./classes/Player";
import { CheckersGameManager } from "./classes/CheckersGameManager";

interface SocketUser {
    [key: string]: string;
}
const socket_user: SocketUser = {};


let checkersGames: { [key: string]: CheckersGame } = {};
let players: { [key: string]: Player } = {};

let checkers = CheckersGameManager.getInstance();

function getGames() {
    return checkers.getGames().map((game: CheckersGame) => {
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
            

            let game = checkers.createGame(data.gameName);

            let player = game.addPlayer(data.name, socket.id);
            
            checkers.trackPlayer(socket.id, player);


            const games = getGames();
            console.log(games);
            socket.broadcast.emit("send-games", { games });

            socket.join(`checkers-${data.gameName}`);
            
        });

        socket.on("checkers-join-game", (data: { gameName: string, name: string }) => {
            

            let game = checkers.getGame(data.gameName);

            if (!game) {
                socket.emit("checkers-join-game-error", { message: "Game does not exist." });
                return;
            }

            let currentGamePlayers = game.getPlayers();

            for (let i = 0; i < currentGamePlayers.length; i++) {
                if (currentGamePlayers[i].getSocketId() === socket.id) {
                    socket.emit("checkers-join-game-error", { message: "You are already in this game." });
                    return;
                }
            }

            let player = game.addPlayer(data.name, socket.id);

            checkers.trackPlayer(socket.id, player);


            const games = getGames();
            console.log(games);
            socket.broadcast.emit("send-games", { games });

            socket.join(`checkers-${data.gameName}`);

            // attempt a game start
            let gameStarted = game.startGame();
            
            if (gameStarted) {
                const board = game.getBoard();

                for (let i = 0; i < game.getPlayers().length; i++) {
                    io.to(game.getPlayers()[i].getSocketId()).emit("checkers-render-game", { board: board?.renderBoard(), currentPlayerTurn: game.getCurrentPlayerTurn(), player: game.getPlayers()[i].getId(), playerName: game.getPlayers()[i].getName(), opposingPlayerName: game.getPlayers()[i === 0 ? 1 : 0].getName() });
                }
            }
            
        
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

            let player = checkers.getPlayer(socket.id);
            if (player) {

                checkers.endGame(player.getGameId());


                const games = getGames();
                console.log(games);
                socket.broadcast.emit("send-games", { games });
            }


        });
    });
}

export default connections;