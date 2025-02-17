import React, { useEffect, useState } from 'react';
import styles from './GameStyles.module.css';

function Game({ game }) {

    // console.log("Game.jsx", game)

  return (
    <section className={styles.container}>
      <h2>Game: {game.gameName}</h2>

      {game.gameData.length === 0 ? (
        <p>Loading... </p>
      ) : (
        <div>
          Loaded
        </div>
      )}

    </section>
  );
};

export default Game;