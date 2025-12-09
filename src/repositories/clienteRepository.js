import db from '../database/db.js';

const repository = {
  getAll() {
    const stmt = db.prepare('SELECT * FROM clientes');
    return stmt.all();
  },

  getById(id) {
    const stmt = db.prepare('SELECT * FROM clientes WHERE id = ?');
    return stmt.get(id);
  },

  findByName(nome) {
    const stmt = db.prepare('SELECT * FROM clientes WHERE nome LIKE ? LIMIT 1');
    return stmt.get(`%${nome}%`);
  },

  
};

export default repository;
