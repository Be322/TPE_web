import db from '../database/db.js';

const clienteRepository = {
  getAll() {
    return db.prepare('SELECT * FROM clientes').all();
  },

  getById(id) {
    return db.prepare('SELECT * FROM clientes WHERE id = ?').get(id);
  },

  findByDocumento(documento) {
    return db.prepare('SELECT * FROM clientes WHERE documento = ?').get(documento);
  },

  create(data) {
    const stmt = db.prepare(`
      INSERT INTO clientes (nome, telefone, email, documento)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(
      data.nome,
      data.telefone || null,
      data.email || null,
      data.documento || null
    );

    return this.getById(result.lastInsertRowid);
  },

  update(id, data) {
    const stmt = db.prepare(`
      UPDATE clientes SET
        nome = ?,
        telefone = ?,
        email = ?,
        documento = ?
      WHERE id = ?
    `);

    stmt.run(
      data.nome,
      data.telefone || null,
      data.email || null,
      data.documento || null,
      id
    );

    return this.getById(id);
  },

  delete(id) {
    return db.prepare('DELETE FROM clientes WHERE id = ?').run(id);
  }
};

export default clienteRepository;
