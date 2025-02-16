import React, { useEffect, useState } from 'react';
import styles from './CreateNewGameStyles.module.css';

function CreateNewGame({ createGame }) {
  const [name, setName] = useState('');
  const [gameName, setGameName] = useState('');

  return (
    <section className={styles.container}>
        <h1>Create A New Game</h1>

        <h2>Name</h2>
        <input placeholder='Enter your name' onChange={(event) => { setName(event.target.value); }}></input>

        <h2>Name of Game</h2>
        <input placeholder='Enter name of game' onChange={(event) => { setGameName(event.target.value); }}></input>

        <button onClick={() => createGame(name, gameName)}>Create</button>

    </section>
  )
}

export default CreateNewGame
