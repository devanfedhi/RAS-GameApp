import './App.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io(`https://server.otterhello.live`);

type Message = {
  user: string;
  message: string;
};

function App() {
  var joinedRoom = "";

  const [messages, setMessages] = useState<Message[]>([]);

  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");

  const joinRoom = () => {
    if (room !== "") {

      if (joinedRoom !== "") {
        socket.emit("leave_room", joinedRoom);
      }
      
      socket.emit("join_room", {room, user});
      joinedRoom = room;
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room, user });

    setMessages((prevMessages) => [...prevMessages, { user: "You", message: message }]);
  };

  useEffect(() => {
    const handleMessageReceive = (data: Message) => {
      console.log("received message");

      setMessages((prevMessages) => [...prevMessages, { user: data.user, message: data.message }]);
      // alert(data.message);
    };

    socket.on("receive_message", handleMessageReceive);

    return () => {
      socket.off("receive_message", handleMessageReceive);
    };
  }, []); // Empty dependency array ensures this runs only once


  return (
    <>
      <h1>Game App</h1>

      <div>
        <input
          placeholder="Username..."
          onChange={(event) => {
            setUser(event.target.value);
          }}
        />
        <input
          placeholder="Room Number..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}> Join Room</button>
        <input placeholder="Message" onChange={(event) => {
          setMessage(event.target.value);
        }}/>
        <button onClick={sendMessage}>Send Message</button>

        <h2>Messages: </h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}><strong>{msg.user}:</strong> {msg.message}</li>
          ))}
        </ul>
        
      </div>
    </>
  )
}

export default App
