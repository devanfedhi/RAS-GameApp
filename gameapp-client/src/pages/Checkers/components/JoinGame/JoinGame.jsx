import React, { useEffect, useState } from 'react';
import styles from './JoinGameStyles.module.css';

function JoinGame({ joinGame, chosenGame }) {
  const [name, setName] = useState('');

  return (
    <section className={styles.container}>
        <h2>Join Game: {chosenGame.gameName}</h2>

        <div className={styles.players}>
          <h3>Current Players ({chosenGame.currentNumPlayers}/2)</h3>
            <ul>
                {chosenGame.playerNames.map((player) => (
                <li key={player}><p>{player}</p></li>
                ))}
            </ul>
        </div>

        <div className={styles.nameInput}>
          <h3>Your Name</h3>
          <input placeholder='Enter your name' onChange={(event) => { setName(event.target.value); }}></input>
        </div>


        <button className={styles.joinButton} onClick={() => joinGame(name, chosenGame)}>Join</button>

    </section>
  )
}

export default JoinGame
