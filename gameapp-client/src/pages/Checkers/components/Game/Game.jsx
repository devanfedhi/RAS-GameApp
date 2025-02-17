import React, { useEffect, useState } from 'react';
import styles from './GameStyles.module.css';

function Game({ game }) {

  return (
    <section className={styles.container}>
      {console.log("TESSSSSSSSSSSST", game)}

      {!game.gameData ? (
        <div className={styles.content}>
          <h2>Game: {game.gameName}</h2>
          <p>Loading... </p>
        </div>
        
      ) : (
        <div className={styles.content}>
          <h2>Game: {game.gameName} ({game.gameData.playerName})</h2>
          <div className={styles.turnHeader}>
            {game.gameData.currentPlayerTurn === game.gameData.player ? 
              <h3>Your Turn ({game.gameData.playerName})</h3> : 
              <h3>Waiting for Opponent ({game.gameData.opposingPlayerName})</h3>}
          </div>
          <div className={styles.checkersBoard}>
            {game.gameData.board.flat().map((cell, index) => {
              const cellClass = (cell.x + cell.y) % 2 === 0 ? styles.blackCell : styles.whiteCell;
              const tokenClass = cell.token === 1 ? styles.whiteToken : styles.blackToken;
              return (
                <div key={index} className={`${styles.cell} ${cellClass}`}>
                  <p>[x:{cell.x},y:{cell.y}]</p>
                  {cell.token ? <div className={`${styles.token} ${tokenClass}`}></div> : null}
                  
                </div>
              );
            })}
          </div>
        </div>
        
      )}

    </section>
  );
};

export default Game;