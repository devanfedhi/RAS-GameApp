import { useEffect, useState } from 'react';
import io from 'socket.io-client';
// const socket = io(import.meta.env.PROD ? 'https://www.otterhello.live' : 'http://localhost:4001');


function ChatApp() {
  var joinedRoom = "";

  const [messages, setMessages] = useState([]);

  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [socket, setSocket] = useState(null);

  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const newSocket = io(import.meta.env.PROD ? 'https://www.otterhello.live' : 'http://localhost:4001');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

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
    if (socket) {
      const handleMessageReceive = (data) => {
        console.log("received message");
        setMessages((prevMessages) => [...prevMessages, { user: data.user, message: data.message }]);
      };

      socket.on("receive_message", handleMessageReceive);

      return () => {
        socket.off("receive_message", handleMessageReceive);
      };
    }
  }, [socket]);

  return (
    <>
      <h1>Chat App</h1>

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

export default ChatApp
