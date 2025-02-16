import './App.css';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Updated imports

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Router>
      <div className="App">
        <h1>Chat App</h1>
        <Routes> {/* Changed from Switch to Routes */}
          <Route path="/" element={isLogin ? <Login /> : <Register />} /> 
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>

        <button onClick={() => setIsLogin(!isLogin)} style={{ marginTop: '20px' }}>
          Switch to {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </Router>
  );
}

export default App;
