const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

function parseTags(row) {
  return row.tags ? JSON.parse(row.tags) : [];
}

router.post('/', authenticateToken, (req, res) => {
  const { title, content, tags } = req.body;
  const tagsJson = JSON.stringify(tags || []);
  const stmt = db.prepare(`INSERT INTO insights (user_id, title, content, tags) VALUES (?, ?, ?, ?)`);
  stmt.run(req.user.id, title, content, tagsJson, function(err) {
    if (err) return res.status(500).json({ error: 'Erro ao criar insight' });
    db.get('SELECT * FROM insights WHERE id = ?', [this.lastID], (e, row) => {
      row.tags = parseTags(row);
      res.status(201).json(row);
    });
  });
});

router.get('/', authenticateToken, (req, res) => {
  const { page = 1, limit = 10, tag } = req.query;
  const offset = (page - 1) * limit;
  let query = `SELECT * FROM insights WHERE user_id = ?`;
  const params = [req.user.id];

  if (tag) {
    query += ` AND tags LIKE ?`;
    params.push(`%${tag}%`);
  }
  query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  params.push(Number(limit), offset);

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar insights' });
    const data = rows.map(r => ({ ...r, tags: parseTags(r) }));
    res.json({ page: Number(page), limit: Number(limit), insights: data });
  });
});

router.get('/:id', authenticateToken, (req, res) => {
  db.get(
    'SELECT * FROM insights WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: 'Erro ao buscar insight' });
      if (!row) return res.status(404).json({ error: 'Insight não encontrado' });
      row.tags = parseTags(row);
      res.json(row);
    }
  );
});

// UPDATE
router.put('/:id', authenticateToken, (req, res) => {
  const { title, content, tags } = req.body;
  const tagsJson = JSON.stringify(tags || []);
  const stmt = db.prepare(
    `UPDATE insights SET title = ?, content = ?, tags = ? WHERE id = ? AND user_id = ?`
  );
  stmt.run(title, content, tagsJson, req.params.id, req.user.id, function(err) {
    if (err) return res.status(500).json({ error: 'Erro ao atualizar' });
    if (this.changes === 0) return res.status(404).json({ error: 'Não encontrado ou sem permissão' });
    db.get('SELECT * FROM insights WHERE id = ?', [req.params.id], (e, row) => {
      row.tags = parseTags(row);
      res.json(row);
    });
  });
});

router.delete('/:id', authenticateToken, (req, res) => {
  const stmt = db.prepare(`DELETE FROM insights WHERE id = ? AND user_id = ?`);
  stmt.run(req.params.id, req.user.id, function(err) {
    if (err) return res.status(500).json({ error: 'Erro ao deletar' });
    if (this.changes === 0) return res.status(404).json({ error: 'Não encontrado ou sem permissão' });
    res.status(204).end(); 
  });
});

module.exports = router;