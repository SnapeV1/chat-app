import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');  // Ensure username is initialized
  const [userFound, setUserFound] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!username.trim()) {
      setResponseMessage('Please enter a username');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/search',
        { query: username }, 
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );


      if (response.data.exists) {
        setResponseMessage(`User found: ${response.data.user.username}`);
        setUserFound(true);
      } else {
        setResponseMessage(response.data.message || 'User not found');
        setUserFound(false);
      }
    } catch (error) {
     // console.error('Error searching user:', error);
      setResponseMessage('Error searching user');
      setUserFound(false);
    }
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
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Search for a user"
        />
        <button onClick={handleSearch}>Search</button>
        <p>{responseMessage}</p>
      </div>

      {userFound && <p>User found! Ready to chat.</p>}

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
