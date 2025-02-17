import { Player } from "./Player";
import { CheckersBoard } from "./CheckersBoard";
import { Colour } from "../enums/Colour";

export class CheckersGame {

    private players: Player[] = []; 

    private maxPlayers: number = 2;

    private currentPlayerTurn: number = 1;

    private board: CheckersBoard | null = null;

    constructor(private gameName: string) {
    }

    public getBoard(): CheckersBoard | null {
        return this.board;
    }


    public addPlayer(name: string, socketId: string): Player {
        let player = new Player(name, socketId, this.gameName);
        player.setId(this.players.length + 1);
        this.players.push(player);

        return player;
    }

    public getGameName(): string {
        return this.gameName;
    }

    public getPlayers(): Player[] {
        return this.players;
    }

    public getPlayerNames(): string[] {
        return this.players.map((player: Player) => {
            return player.getName();
        });
    }

    public getCurrentPlayerTurn(): number {
        return this.currentPlayerTurn
    }

    public getMaxPlayers(): number {
        return this.maxPlayers;
    }

    public startGame(): boolean {
        if (this.players.length !== this.maxPlayers) {
        
            console.log("Not enough players to start game");
            return false;
        }

        console.log("Game started");

        this.players[0].setColour(Colour.White);
        this.players[1].setColour(Colour.White);
        this.board = new CheckersBoard(8, 8);

        return true;


    }

    


}