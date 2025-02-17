// import { Cell } from './Cell';

export class CheckersBoard {

    // board: Cell[][] = [];
    tokenRows: number;

    constructor(public maxHeight: number, public maxWidth: number) {
        this.tokenRows = (maxHeight / 2) - 1;

        // this.initializeBoard();
    }

    // initializeBoard() {
    //     for(let j = this.maxHeight -1 ; j >= 0; j--) {
    //         const row: Cell[] = [];
    //         for (let i = 0; i < this.maxWidth; i++) {
    //             let cell = new Cell(i, j);

    //             if (j <= this.tokenRows - 1) {
    //                 cell.spawnToken(Colour.White); 
    //             } else if (j >= this.maxHeight - this.tokenRows) {
    //                 cell.spawnToken(Colour.Black); 
    //             }
    //             row.push(cell);
    //         }
    //         this.board.push(row);
    //     }
    // }

    // render() {
    //     const flattenedBoard = this.board.flat();
    //     const renderizedBoard = flattenedBoard.map((cell) => cell.render());

    //     return (
    //         <div className={styles.checkersBoard}>
    //             {renderizedBoard}
    //         </div>
    //     );
    // }

    // getCellAt(x: number, y: number): Cell | null {

    //     console.log(this.board)
    //     if (x < 0 || x >= this.maxWidth || y < 0 || y >= this.maxHeight) {
    //         return null;
    //     }
    //     return this.board[this.maxHeight - y - 1][x];
    // }

    // getBoard(){
    //     return this.board.flat();
    // }

  
}

