import './App.css';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';



function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <h1>Chat App</h1>
      {isLogin ? <Login /> : <Register />}
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Register" : "Login"}
      </button>
    </div>
  );
}

export default App;
