import React, { useEffect, useState } from 'react';
import styles from './LobbyStyles.module.css';
import { PAGE_CREATE_NEW_GAME } from '../Props';

function Lobby({ setPage, allGames }) {

  return (
    <div>
      <h2>Lobby</h2>
      {/* Example usage of setPage */}
      <button onClick={() => setPage(PAGE_CREATE_NEW_GAME)}>Create New Game</button>


      <table>
        <thead>
          <tr>
            <th>Game Name</th>
            <th>Number of Players</th>
            <th>Players</th>
          </tr>
        </thead>
        <tbody>
          {!allGames && (
            <tr>
              <td colSpan="3">Loading... no games created yet</td>
            </tr>
          )}
          {allGames && allGames.map((game) => (
            <tr key={game.gameName}>
              <td>{game.gameName}</td>
              <td>{game.currentNumPlayers} / 2</td>
              <td>
                {game.playerNames.map((player) => (
                  <div key={player}>{player}</div>
                ))}
              </td>
              <td><button>Join Game</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lobby;
