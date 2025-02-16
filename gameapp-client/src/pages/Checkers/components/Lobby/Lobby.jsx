import React, { useEffect, useState } from 'react';
import styles from './LobbyStyles.module.css';
import { PAGE_CREATE_NEW_GAME } from '../Props';

function Lobby({ setPage, allGames }) {

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
        <tbody classname={styles.lobbyTableBody}>
        {!allGames ? (
          <tr>
            <td colSpan="3">Loading... no games created yet</td>
          </tr>
        ) : (
          allGames.map((game) => (
            <tr key={game.gameName}>
              <td><p>{game.gameName}</p></td>
              <td><p>{game.currentNumPlayers} / 2</p></td>
              <td><p>
                {game.playerNames.map((player) => (
                  <div key={player}>{player}</div>
                ))}
              </p></td>
              <td><button className={styles.joinButton}><p>Join</p></button></td>
            </tr>
          ))
        )}
        </tbody>
      </table>
    </section>
  );
};

export default Lobby;
