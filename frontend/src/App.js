import './App.css';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import PrivateRoute from './components/PrivateRoute'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Router>
      <div className="App">
        <h1>Chat App</h1>
        <Routes>
          <Route path="/" element={isLogin ? <Login /> : <Register />} />
          <Route path="/chat" element={<PrivateRoute element={<Chat />} />} /> {/* Protected Route */}
        </Routes>
        <button onClick={() => setIsLogin(!isLogin)} style={{ marginTop: '20px' }}>
          Switch to {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </Router>
  );
}

export default App;
