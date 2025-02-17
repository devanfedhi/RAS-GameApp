import { UUID } from "crypto";
import { CheckersGame } from "./CheckersGame";

export class CheckersGameManager {
    private static instance: CheckersGameManager;

    private checkersGames: { [key: string]: CheckersGame } = {};

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
    public createGame(gameName: string): void {
        let game = new CheckersGame(gameName);
        this.checkersGames[gameName] = game;
    }

    public endGame(gameName: string): void {
        delete this.checkersGames[gameName];
    }

    public getGame(gameName: string): CheckersGame | null {
        return this.checkersGames[gameName] || null;
    }
}