import db from '../database/db.js';

const cardapioRepository = {
  getAll() {
    const stmt = db.prepare('SELECT * FROM cardapio');
    return stmt.all();
  },

  getById(id) {
    const stmt = db.prepare('SELECT * FROM cardapio WHERE id = ?');
    return stmt.get(id);
  },

  create({ nome, preco }) {
    const stmt = db.prepare(`
      INSERT INTO cardapio (nome, preco)
      VALUES (?, ?)
    `);
    return stmt.run(nome, preco);
  },

  update(id, { nome, preco }) {
    const stmt = db.prepare(`
      UPDATE cardapio
      SET nome = ?, preco = ?
      WHERE id = ?
    `);

    return stmt.run(nome, preco, id);
  },

  delete(id) {
    const stmt = db.prepare('DELETE FROM cardapio WHERE id = ?');
    return stmt.run(id);
  }
};

export default cardapioRepository;
