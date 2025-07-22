import { useState } from 'react';
import axios from 'axios';
import '../CSS/Entry.css'

export default function Register({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backend-5rzv.onrender.com/ai/register', formData);
      alert('Registered successfully!');
      onRegisterSuccess(); // ✅ this switches to login view
    } catch (err) {
      alert(err.response?.data?.error || 'Register failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='registerForm'>
      <h2>Register</h2>
      Enter Name: <input type="text" name="username" placeholder="Username" onChange={handleChange} required /><br /><br />
      Enter email: <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br /><br />
      Enter password:<input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br /><br />
      <button type="submit">Register</button>
    </form>
  );
}
