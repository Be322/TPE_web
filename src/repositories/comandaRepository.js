import db from '../database/db.js';

const comandaRepository = {
  getAll() {
    const stmt = db.prepare('SELECT * FROM comandas');
    return stmt.all();
  },

  getById(id) {
    const stmt = db.prepare('SELECT * FROM comandas WHERE id = ?');
    return stmt.get(id);
  },

  create({ mesa, status = 'aberta' }) {
    const stmt = db.prepare(`
      INSERT INTO comandas (mesa, status)
      VALUES (?, ?)
    `);

    return stmt.run(mesa, status);
  },

  update({ id, mesa, status, dataFechamento }) {
    const stmt = db.prepare(`
      UPDATE comandas
      SET mesa = ?, status = ?, dataFechamento = ?
      WHERE id = ?
    `);
    return stmt.run(mesa, status, dataFechamento, id);
  },

  delete(comandaId) {
    const delLinks = db.prepare('DELETE FROM comanda_pedidos WHERE comandaId = ?');
    delLinks.run(comandaId);

    const stmt = db.prepare('DELETE FROM comandas WHERE id = ?');
    return stmt.run(comandaId);
  },

  addPedido({ comandaId, pedidoId }) {
    const stmt = db.prepare(`
      INSERT INTO comanda_pedidos (comandaId, pedidoId)
      VALUES (?, ?)
    `);
    return stmt.run(comandaId, pedidoId);
  },

  getPedidos(comandaId) {
    const stmt = db.prepare(`
      SELECT p.*
      FROM pedidos p
      JOIN comanda_pedidos cp ON cp.pedidoId = p.id
      WHERE cp.comandaId = ?
    `);
    return stmt.all(comandaId);
  }
};

export default comandaRepository;
