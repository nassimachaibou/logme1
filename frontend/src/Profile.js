import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Profile.css'; // 👉 Add styles here

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access');

    if (!token) {
      alert("You must log in first.");
      window.location.href = '/';
      return;
    }

    axios.get('http://127.0.0.1:8000/api/profile/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => setUser(res.data))
      .catch(err => {
        console.error(err);
        alert("Access denied. Please log in again.");
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/';
      });
  }, []);

  return user ? (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Welcome, {user.username} 👋</h2>
        <p><strong></strong> {user.email}</p>

        <Link to="/logout">
          <button className="logout-btn">Logout</button>
        </Link>
      </div>
    </div>
  ) : (
    <p className="loading">Loading profile...</p>
  );
}

export default Profile;
