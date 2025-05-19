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
  const page  = parseInt(req.query.page,  10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;
  const tag    = req.query.tag;

  let countQuery  = 'SELECT COUNT(*) AS count FROM insights WHERE user_id = ?';
  const countParams = [req.user.id];
  if (tag) {
    countQuery += ' AND tags LIKE ?';
    countParams.push(`%${tag}%`);
  }

  db.get(countQuery, countParams, (countErr, countRow) => {
    if (countErr) return res.status(500).json({ error: 'Erro ao contar insights' });
    const total = countRow.count;

    let dataQuery = 'SELECT * FROM insights WHERE user_id = ?';
    const dataParams = [req.user.id];
    if (tag) {
      dataQuery += ' AND tags LIKE ?';
      dataParams.push(`%${tag}%`);
    }
    dataQuery += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    dataParams.push(limit, offset);

    db.all(dataQuery, dataParams, (err, rows) => {
      if (err) return res.status(500).json({ error: 'Erro ao buscar insights' });
      const insights = rows.map(r => ({ ...r, tags: parseTags(r) }));
      res.json({ page, limit, total, insights });
    });
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