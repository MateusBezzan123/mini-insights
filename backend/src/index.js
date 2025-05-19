require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const insightsRoutes = require('./routes/insights');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/insights', insightsRoutes);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));