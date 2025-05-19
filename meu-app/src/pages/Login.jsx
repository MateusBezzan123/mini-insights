import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handle = e => { e.preventDefault(); login(email, password); };
  return (
    <form onSubmit={handle} className="form">
      <h2>Login</h2>
      <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
      <button type="submit">Entrar</button>
    </form>
  );
}