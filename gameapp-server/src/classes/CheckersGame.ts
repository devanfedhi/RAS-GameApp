import { Player } from "./Player";
import { CheckersBoard } from "./CheckersBoard";
import { Colour } from "../enums/Colour";

export class CheckersGame {

    private players: Player[] = []; 

    private maxPlayers: number = 2;

    private board: CheckersBoard | null = null;

    constructor(private gameName: string) {
    }

    public addPlayer(player: Player): void {
        player.setId(this.players.length);
        this.players.push(player);
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

    public getMaxPlayers(): number {
        return this.maxPlayers;
    }

    public startGame(): void {
        if (this.players.length !== this.maxPlayers) {
        
            console.log("Not enough players to start game");
            return;
        }

        console.log("Game started");

        this.players[0].setColour(Colour.White);
        this.players[1].setColour(Colour.White);
        this.board = new CheckersBoard(8, 8);

    }

    


}