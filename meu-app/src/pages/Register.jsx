import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handle = e => { e.preventDefault(); register(name, email, password); };
  return (
    <form onSubmit={handle} className="form">
      <h2>Registro</h2>
      <input required value={name} onChange={e => setName(e.target.value)} placeholder="Nome" />
      <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
      <button type="submit">Registrar</button>
    </form>
  );
}