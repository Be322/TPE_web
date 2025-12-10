import db from '../database/db.js';

const pedidoRepository = {
  getAll() {
    const pedidosStmt = db.prepare('SELECT * FROM pedidos ORDER BY id DESC');
    return pedidosStmt.all();
  },

  getById(id) {
    const stmt = db.prepare('SELECT * FROM pedidos WHERE id = ?');
    return stmt.get(id);
  },

  createPedido({ mesa, total, status = 'aguardando' }) {
    const stmt = db.prepare(`
      INSERT INTO pedidos (mesa, total, status)
      VALUES (?, ?, ?)
    `);
    return stmt.run(mesa, total, status);
  },

  addItens(pedidoId, itens) {
    const stmt = db.prepare(`
      INSERT INTO itens_pedido (pedidoId, produtoId, quantidade)
      VALUES (?, ?, ?)
    `);

    const insertMany = db.transaction((rows) => {
      for (const row of rows) {
        stmt.run(pedidoId, row.produtoId, row.quantidade);
      }
    });

    insertMany(itens);
  },

  getItensByPedido(pedidoId) {
    const stmt = db.prepare(`
      SELECT ip.id, ip.quantidade, p.id AS produtoId, p.nome, p.preco
      FROM itens_pedido ip
      JOIN produtos p ON p.id = ip.produtoId
      WHERE ip.pedidoId = ?
    `);
    return stmt.all(pedidoId);
  },

  delete(id) {
    const stmt = db.prepare('DELETE FROM pedidos WHERE id = ?');
    return stmt.run(id);
  }
};

export default pedidoRepository;
