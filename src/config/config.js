const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error("Erro ao conectar ao SQLite:", err);
    } else {
        console.log("SQLite conectado em", DB_PATH);
    }
});

module.exports = db;
