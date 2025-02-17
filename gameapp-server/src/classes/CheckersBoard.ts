import { Cell } from './Cell';
import { Colour } from '../enums/Colour';

export class CheckersBoard {

    board: Cell[][] = [];
    tokenRows: number;

    constructor(public maxHeight: number, public maxWidth: number) {
        this.tokenRows = (maxHeight / 2) - 1;

        this.initializeBoard();
    }

    initializeBoard() {
        for(let j = this.maxHeight -1 ; j >= 0; j--) {
            const row: Cell[] = [];
            for (let i = 0; i < this.maxWidth; i++) {
                let cell = new Cell(i, j);

                if (j <= this.tokenRows - 1) {
                    cell.spawnToken(Colour.White); 
                } else if (j >= this.maxHeight - this.tokenRows) {
                    cell.spawnToken(Colour.Black); 
                }
                row.push(cell);
            }
            this.board.push(row);
        }
    }

    // getCellAt(x: number, y: number): Cell | null {

    //     console.log(this.board)
    //     if (x < 0 || x >= this.maxWidth || y < 0 || y >= this.maxHeight) {
    //         return null;
    //     }
    //     return this.board[this.maxHeight - y - 1][x];
    // }

    public getBoard(){
        return this.board.flat();
    }

    public renderBoard(){

        let renderizedBoard = [];

        for (let j = 0; j < this.board.length; j++) {
            let row = [];
            for (let i = 0; i < this.board[0].length; i++) {
                let cell: { x: number | null, y: number | null, token: Colour | null } = { x: null, y: null, token: null };
                const coords = this.board[j][i].getCoordinates();
                cell.x = coords.x;
                cell.y = coords.y;

                const token = this.board[j][i].getToken();
                cell.token = token ? token.getColour() : null;
                row.push(cell);
            }
            renderizedBoard.push(row);
        }

        return renderizedBoard;

    }

  
}

