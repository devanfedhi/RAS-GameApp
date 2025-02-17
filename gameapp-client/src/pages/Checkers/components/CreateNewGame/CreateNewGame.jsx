import React, { useEffect, useState } from 'react';
import styles from './CreateNewGameStyles.module.css';

function CreateNewGame({ createGame }) {
  const [name, setName] = useState('');
  const [gameName, setGameName] = useState('');

  return (
    <section className={styles.container}>
        <h2>Create A New Game</h2>

        <div className={styles.nameInput}>
          <h3>Your Name</h3>
          <input placeholder='Enter your name' onChange={(event) => { setName(event.target.value); }}></input>
        </div>

        <div className={styles.gameInput}>
          <h3>Name of Game</h3>
          <input placeholder='Enter name of game' onChange={(event) => { setGameName(event.target.value); }}></input>
        </div>

        

        

        <button className={styles.createButton} onClick={() => createGame(name, gameName)}>Create</button>

    </section>
  )
}

export default CreateNewGame
