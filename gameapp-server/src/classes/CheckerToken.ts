import { Colour } from '../enums/Colour';
import { Cell } from './Cell';
import { CheckersGame } from './CheckersGame';

export class CheckerToken {
    private directionMultiplier: number;

    constructor(public cell: Cell, public colour: Colour) {
        this.directionMultiplier = this.colour === Colour.White ? 1 : -1;
    }

    public getColour(): Colour {
        return this.colour;
    }



}

