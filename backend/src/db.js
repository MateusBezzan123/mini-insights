const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = process.env.DB_FILE || 'db.sqlite';

const db = new sqlite3.Database(DBSOURCE, err => {
  if (err) {
    console.error('Erro ao conectar no SQLite:', err);
    process.exit(1);
  }
  console.log('Conectado ao SQLite');
});

module.exports = db;