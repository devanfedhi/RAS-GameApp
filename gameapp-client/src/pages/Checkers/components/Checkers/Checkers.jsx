import React, { useEffect, useState } from 'react';
import styles from './CheckersStyles.module.css';
import Lobby from '../Lobby/Lobby';
import CreateNewGame from '../CreateNewGame/CreateNewGame';
import JoinGame from '../JoinGame/JoinGame';
import Game from '../Game/Game';
import io from 'socket.io-client';
import { PAGE_GAME, PAGE_LOBBY, PAGE_JOIN_GAME, PAGE_CREATE_NEW_GAME } from '../Props';
// import { get } from 'http';


function Checkers() {

	const [page, setPage] = useState(PAGE_LOBBY);
	const [socket, setSocket] = useState(null);
  const [allGames, setAllGames] = useState([]);
  const [game, setGame] = useState({ gameName: "", gameData: null });
  const [chosenGame, setChosenGame] = useState({});


  // Socket connection initialisation
  useEffect(() => {
    const newSocket = io(import.meta.env.PROD ? 'https://www.otterhello.live' : 'http://localhost:4001');
    
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      console.log("Socket connected, setting up event listener for 'send-games'");

      socket.on('send-games', handleSendGames);

      socket.emit('get-games');

      socket.on('checkers-render-game', handleRenderGame);

      return () => {
        console.log("Cleaning up event listener for 'send-games'");
        socket.off('send-games', handleSendGames);
        socket.off('checkers-render-game', handleRenderGame);
      };
    } else {
      // console.log("Socket not connected");
    }
  }, [socket]);


  const joinGame = (name, chosenGame) => {
    setGame({ gameName: chosenGame.gameName, gameData: null });
    socket.emit('checkers-join-game', {name: name, gameName: chosenGame.gameName});
    setPage(PAGE_GAME);
  }

  
  const createGame = (name, gameName) => {
    setGame({ gameName, gameData: null });
    // console.log("createGame reached", name, gameName);
    socket.emit('checkers-create-game', {name, gameName});
    setPage(PAGE_GAME);

    console.log(game);
  };

  const handleSendGames = (games) => {
    console.log("Received games:", games);
    setAllGames(games);
  };

  const handleRenderGame = (data) => {
    console.log("Received data:", data);

    setGame((prevGame) => ({
      ...prevGame,
      gameData: data,
    }));
  };



  return (
    <>
      <section className={styles.container}>
          <h1>Checkers</h1>
          {page === PAGE_LOBBY && (
              <Lobby setPage={setPage} setChosenGame={setChosenGame} allGames={allGames.games}/>
          )}
          {page === PAGE_CREATE_NEW_GAME && (
              <CreateNewGame createGame={createGame}/>
          )}
          {page === PAGE_JOIN_GAME && (
              <JoinGame joinGame={joinGame} chosenGame={chosenGame}/> 
          )}
          {page === PAGE_GAME && (
              <Game game={game}/> 
          )}

      </section>
    </>
    
  )
}

export default Checkers
