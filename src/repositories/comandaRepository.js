import db from '../database/db.js';

const comandaRepository = {
  getAll() {
    const stmt = db.prepare(`
      SELECT * FROM comanda
    `);
    return stmt.all();
  },

  getById(id) {
    const stmt = db.prepare('SELECT * FROM comanda WHERE id = ?');
    return stmt.get(id);
  },

  create({ nomeCliente, mesa }) {
    const stmt = db.prepare(`
      INSERT INTO comanda (nomeCliente, mesa)
      VALUES (?, ?)
    `);

    return stmt.run(nomeCliente, mesa);
  },

  addPedido({ comandaId, pedidoId }) {
    const stmt = db.prepare(`
      INSERT INTO comanda_itens (comandaId, pedidoId)
      VALUES (?, ?)
    `);
    return stmt.run(comandaId, pedidoId);
  },

  getPedidos(comandaId) {
    const stmt = db.prepare(`
      SELECT p.*
      FROM pedidos p
      JOIN comanda_itens ci ON ci.pedidoId = p.id
      WHERE ci.comandaId = ?
    `);
    return stmt.all(comandaId);
  }
};

export default comandaRepository;
