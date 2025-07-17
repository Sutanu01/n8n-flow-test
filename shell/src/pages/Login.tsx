import { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(import.meta.env.VITE_API_URL)
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email, password
      });
      localStorage.setItem('token', res.data.token);
      onLogin();
    } catch {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
