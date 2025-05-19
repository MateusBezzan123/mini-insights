const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'uma_chave_secreta';
const bcrypt = require('bcrypt');

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token faltando' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

module.exports = { hashPassword, comparePassword, authenticateToken, SECRET };