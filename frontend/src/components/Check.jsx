import { useState } from 'react';
import Entry from './Entry';
import Main from './Main';
import '../CSS/Entry.css'

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return now > expiry;
  } catch (e) {
    return true;
  }
}

export default function Check() {
  const token = localStorage.getItem('token');
  const tokenExpired = token ? isTokenExpired(token) : true;
  const [isLoggedIn, setIsLoggedIn] = useState(token && !tokenExpired);

  const handleLoginSuccess = () => setIsLoggedIn(true);

  const handleLogout = () => {
      console.log("Logout clicked");
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <Main onLogout={handleLogout} />
  ) : (
    <Entry onLoginSuccess={handleLoginSuccess} />
  );
}
