import { CheckerToken } from './CheckerToken';
import { Colour } from '../enums/Colour';

export class Cell {
    token: CheckerToken | null = null;

    constructor(public x: number, public y: number) {}

    spawnToken(colour: Colour) {
        
        if ((this.x + this.y) % 2 === 0) {
            this.token = new CheckerToken(this, colour);
        }
    }

    public getCoordinates() {
        return {x: this.x, y: this.y};
    }

    public getToken() {
        return this.token;
    }


  
}

