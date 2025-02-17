import { UUID } from "crypto";
import { CheckersGame } from "./CheckersGame";
import { Player } from "./Player";

export class CheckersGameManager {
    private static instance: CheckersGameManager;

    private checkersGames: { [key: string]: CheckersGame } = {};
    private players: { [key: string]: Player } = {};

    // Private constructor to prevent direct instantiation
    private constructor() {
        // Initialization code here
    }

    // Static method to get the single instance of the class
    public static getInstance(): CheckersGameManager {
        if (!CheckersGameManager.instance) {
            CheckersGameManager.instance = new CheckersGameManager();
        }
        return CheckersGameManager.instance;
    }


    // Other methods and properties of the class
    public createGame(gameName: string): CheckersGame {
        let game = new CheckersGame(gameName);
        this.checkersGames[gameName] = game;

        return game
    }

    public endGame(gameName: string): void {
        delete this.checkersGames[gameName];
    }

    public getGame(gameName: string): CheckersGame | null {
        return this.checkersGames[gameName] || null;
    }

    public getGames(): CheckersGame[] {
        return Object.values(this.checkersGames);
    }


    public trackPlayer(socketId: string, player: Player): void {
        this.players[socketId] = player;
    } 

    public getPlayer(socketId: string): Player | null {
        return this.players[socketId] || null;
    }
}