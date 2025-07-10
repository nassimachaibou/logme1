import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('access');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });

      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      setError('');
      alert("Login successful! ✅");
      window.location.href = '/profile';
    } catch (err) {
      console.error("Login error:", err.response?.data);
      setError('Invalid credentials ❌');
    }
  };

  return (
    <div className="form">
      <h1>Login</h1>

      {isLoggedIn ? (
        <>
          <p>You are already logged in.</p>
          <Link to="/logout">
            <button className="btn block-cube block-cube-hover" style={{ backgroundColor: 'red', color: 'white' }}>
              <div className="bg-top"><div className="bg-inner"></div></div>
              <div className="bg-right"><div className="bg-inner"></div></div>
              <div className="bg"><div className="bg-inner"></div></div>
              <div className="text">Logout</div>
            </button>
          </Link>
        </>
      ) : (
        <>
          <div className="control block-cube block-input">
            <input
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <div className="bg-top"><div className="bg-inner"></div></div>
            <div className="bg-right"><div className="bg-inner"></div></div>
            <div className="bg"><div className="bg-inner"></div></div>
          </div>

          <div className="control block-cube block-input">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className="bg-top"><div className="bg-inner"></div></div>
            <div className="bg-right"><div className="bg-inner"></div></div>
            <div className="bg"><div className="bg-inner"></div></div>
          </div>

          <button onClick={handleLogin} className="btn block-cube block-cube-hover">
            <div className="bg-top"><div className="bg-inner"></div></div>
            <div className="bg-right"><div className="bg-inner"></div></div>
            <div className="bg"><div className="bg-inner"></div></div>
            <div className="text">Login</div>
          </button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}
    </div>
  );
}

export default Login;
