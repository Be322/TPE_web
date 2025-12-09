import db from '../database/db.js';

const pedidoRepository = {
  getAll() {
    const stmt = db.prepare('SELECT * FROM pedidos');
    return stmt.all();
  },

  getById(id) {
    const stmt = db.prepare('SELECT * FROM pedidos WHERE id = ?');
    return stmt.get(id);
  },

  getByComandaId(comandaId) {
    const stmt = db.prepare('SELECT * FROM pedidos WHERE comandaId = ?');
    return stmt.all(comandaId);
  },

  create({ itemId, quantidade, comandaId }) {
    const stmt = db.prepare(`
      INSERT INTO pedidos (itemId, quantidade, comandaId)
      VALUES (?, ?, ?)
    `);

    return stmt.run(itemId, quantidade, comandaId);
  },

  delete(id) {
    const stmt = db.prepare('DELETE FROM pedidos WHERE id = ?');
    return stmt.run(id);
  }
};

export default pedidoRepository;
