import { Colour } from '../enums/Colour';

export class Player {

    private id: number | null = null;

    private colour: Colour | null = null;

    constructor(private name: string, private socketId: string, private gameId: string) {

    }

    public setId(id: number): void {
        this.id = id;
    }

    public getId(): number | null {
        return this.id;
    }

    public getName(): string {      
        return this.name;
    }

    public getSocketId(): string {
        return this.socketId;
    }

    public getGameId(): string {
        return this.gameId;
    }

    public setColour(colour: Colour): void {
        this.colour = colour;
    }

}