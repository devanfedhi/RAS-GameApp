import React, { useEffect, useState } from 'react';
import styles from './CheckersStyles.module.css';
import Lobby from './components/Lobby/Lobby';
import CreateNewGame from './components/CreateNewGame/CreateNewGame';
import io from 'socket.io-client';
import { PAGE_GAME, PAGE_LOBBY, PAGE_CREATE_NEW_GAME } from './components/Props';
// import { get } from 'http';

function Checkers() {

	const [page, setPage] = useState(PAGE_LOBBY);
	const [socket, setSocket] = useState(null);
  const [allGames, setAllGames] = useState([]);

  console.log("Checkers.jsx", allGames);

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

      const handleSendGames = (games) => {
        console.log("Received games:", games);
        setAllGames(games);
      };

      socket.on('send-games', handleSendGames);

      socket.emit('get-games');



      return () => {
        console.log("Cleaning up event listener for 'send-games'");
        socket.off('send-games', handleSendGames);
      };
    } else {
      console.log("Socket not connected");
    }
  }, [socket]);

  
  const createGame = (name, gameName) => {
    console.log("createGame reached", name, gameName);
    socket.emit('checkers-create-game', {name, gameName});
    // setPage(PAGE_GAME);
  };

  return (
    <section className={styles.container}>
        <h1>Checkers</h1>
				{page === PAGE_LOBBY && (
						<Lobby setPage={setPage} allGames={allGames.games}/>
				)}
				{page === PAGE_CREATE_NEW_GAME && (
						<CreateNewGame createGame={createGame}/>
				)}
    </section>
  )
}

export default Checkers
