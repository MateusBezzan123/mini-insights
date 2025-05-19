require('dotenv').config();
const express = require('express');
const db = require('./config/db');

const app = express();
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    const users = await db('users').limit(1);
    res.json({ ok: true, sample: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
