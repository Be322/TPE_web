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

  findByCpf(cpf) {
    const stmt = db.prepare('SELECT * FROM clientes WHERE cpf = ?');
    return stmt.get(cpf);
  },

  create(cliente) {
    const stmt = db.prepare(`
      INSERT INTO clientes (nome, cpf, telefone, email) 
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(cliente.nome, cliente.cpf, cliente.telefone, cliente.email);
    return { id: result.lastInsertRowid, ...cliente };
  },

  update(id, clienteData) {
    const fields = [];
    const values = [];
    
    if (clienteData.nome) {
      fields.push('nome = ?');
      values.push(clienteData.nome);
    }
    if (clienteData.cpf) {
      fields.push('cpf = ?');
      values.push(clienteData.cpf);
    }
    if (clienteData.telefone) {
      fields.push('telefone = ?');
      values.push(clienteData.telefone);
    }
    if (clienteData.email) {
      fields.push('email = ?');
      values.push(clienteData.email);
    }
    
    if (fields.length === 0) return this.getById(id);
    
    values.push(id);
    const stmt = db.prepare(`UPDATE clientes SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    
    return this.getById(id);
  },

  delete(id) {
    const stmt = db.prepare('DELETE FROM clientes WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
};

export default repository;
