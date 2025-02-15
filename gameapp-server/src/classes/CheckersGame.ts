import { Player } from "./Player";

export class CheckersGame {

    private players: Player[] = []; 

    private maxPlayers: number = 2;

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

    


}