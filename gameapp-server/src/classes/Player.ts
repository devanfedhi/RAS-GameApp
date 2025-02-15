export class Player {

    private id: number | null = null;

    constructor(private name: string, private socketId: string) {

    }

    public setId(id: number): void {
        this.id = id;
    }

    public getName(): string {      
        return this.name;
    }

}