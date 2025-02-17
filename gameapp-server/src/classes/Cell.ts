// import styles from '../CheckersStyles.module.css';
// import { Colour } from './Colour';
// import { CheckerToken } from './CheckerToken';
// import { CheckersGame } from './CheckersGame';

// export class Cell {
//     token: CheckerToken | null = null;

//     displayable: boolean = false;

//     constructor(public x: number, public y: number, public colour: Colour) {}

//     render() {
//         const cellClass = this.colour === Colour.White ? styles.whiteCell : styles.blackCell;


//         return (
//             <div onClick={this.handleClick} className={`${styles.cell} ${cellClass}`}>
//                 <text className={styles.text}>[x:{this.x},y:{this.y}]</text>
//                 {this.token ? this.token.render() : null}
//                 {this.displayable ? <div className={styles.displayable}></div> : null}
//             </div>
//         );
//     }

//     spawnToken(colour: Colour) {
        
//         if ((this.x + this.y) % 2 === 0) {
//             this.token = new CheckerToken(this, colour);
//         }
//     }

//     handleClick = () => {
//         if (this.displayable) {
//             const game = CheckersGame.getInstance();
//             const board = game.getBoard();

//             for (let cell of board.getBoard()) {
//                 cell.setDisplayable(false);
//             }
//             game.updateBoard();
//         }
//     }

//     public getToken() {
//         return this.token;
//     }

//     public setDisplayable(displayable: boolean) {
//         this.displayable = displayable;
//     }
  
// }

