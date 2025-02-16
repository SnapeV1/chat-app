import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();  
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");  
  };
  const handleSendMessage = () => {
    socket.emit('sendMessage', message);
    setMessage('');
  };

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Type a message" 
      />
      <button onClick={handleSendMessage}>Send</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
    
  );
};

  
export default Chat;
