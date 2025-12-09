import db from '../database/db.js';

const cardapioRepository = {
  getAll() {
    const stmt = db.prepare('SELECT * FROM produtos');
    return stmt.all();
  },

  getById(id) {
    const stmt = db.prepare('SELECT * FROM produtos WHERE id = ?');
    return stmt.get(id);
  },

  create({ nome, preco, categoria, descricao, imagem }) {
    const stmt = db.prepare(`
      INSERT INTO produtos (nome, preco, categoria, descricao, imagem)
      VALUES (?, ?, ?, ?, ?)
    `);
    return stmt.run(nome, preco, categoria, descricao, imagem);
  },

  update(id, { nome, preco, categoria, descricao, imagem }) {
    const stmt = db.prepare(`
      UPDATE produtos
      SET nome = ?, preco = ?, categoria = ?, descricao = ?, imagem = ?
      WHERE id = ?
    `);

    return stmt.run(nome, preco, categoria, descricao, imagem, id);
  },

  delete(id) {
    const stmt = db.prepare('DELETE FROM produtos WHERE id = ?');
    return stmt.run(id);
  }
};

export default cardapioRepository;
