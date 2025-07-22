import { useState } from 'react';
import axios from 'axios';
import '../CSS/Entry.css'
import '../CSS/Login.css'

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://backend-5rzv.onrender.com/ai/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.email);
      onLogin(); // ✅ this triggers Main to render
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='loginForm'>
      <h2>Login</h2>
      Enter Email:<input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br />
      Enter password:<input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
      <button type="submit">Login</button>
    </form>
  );
}
