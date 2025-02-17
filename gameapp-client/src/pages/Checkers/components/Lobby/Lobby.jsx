import React, { useEffect, useState } from 'react';
import styles from './LobbyStyles.module.css';
import { PAGE_JOIN_GAME, PAGE_CREATE_NEW_GAME } from '../Props';

function Lobby({ setPage, allGames, setChosenGame }) {

  const handleJoinGame = (game) => {
    console.log("Joining game: ", game.gameName);
    setChosenGame(game)
    setPage(PAGE_JOIN_GAME);
  }

  return (
    <section className={styles.container}>
      <h2>Lobby</h2>
      <button className={styles.createButton} onClick={() => setPage(PAGE_CREATE_NEW_GAME)}>Create New Game</button>


      <table className={styles.lobbyTable}> 
        <colgroup>
          <col style={{ width: '25%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '55%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            <th><h3>Game Name</h3></th>
            <th><h3>Size</h3></th>
            <th><h3>Players</h3></th>
            <th><h3></h3></th>
          </tr>
        </thead>
        <tbody>
        {!allGames ? (
          <tr>
            <td colSpan="4"><p>Loading... </p></td>
          </tr>
        ) : allGames.length === 0 ? (
          <tr>
            <td colSpan="4"><p>No games created yet</p></td>
          </tr>
        ): (
          allGames.map((game) => (
            <tr key={game.gameName}>
              <td><p>{game.gameName}</p></td>
              <td><p>{game.currentNumPlayers} / {game.maxPlayers}</p></td>
              <td>
                <ul>
                  {game.playerNames.map((player) => (
                    <li key={player}><p>{player}</p></li>
                  ))}
                </ul>
              </td>
              <td><button onClick={() => handleJoinGame(game)} className={styles.joinButton} disabled={game.currentNumPlayers >= game.maxPlayers}><p>Join</p></button></td>
            </tr>
          ))
        )}
        </tbody>
      </table>
    </section>
  );
};

export default Lobby;
