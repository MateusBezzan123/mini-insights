const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword, SECRET } = require('../middleware/auth');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Dados faltando' });
  try {
    const password_hash = await hashPassword(password);
    const stmt = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)');
    stmt.run(name, email, password_hash, function(err) {
      if (err) return res.status(500).json({ error: 'Email já usado' });
      const user = { id: this.lastID, name, email };
      const token = jwt.sign(user, SECRET, { expiresIn: '8h' });
      res.status(201).json({ token, user });
    });
  } catch (e) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    if (!user) return res.status(400).json({ error: 'Credenciais inválidas' });
    const match = await comparePassword(password, user.password_hash);
    if (!match) return res.status(400).json({ error: 'Credenciais inválidas' });
    const payload = { id: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, SECRET, { expiresIn: '8h' });
    res.json({ token, user: payload });
  });
});

module.exports = router;