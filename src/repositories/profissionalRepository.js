import db from '../database/db.js';

const repository = {
  getAll() {
    const stmt = db.prepare('SELECT * FROM profissionais');
    return stmt.all();
  },

  getById(id) {
    const stmt = db.prepare('SELECT * FROM profissionais WHERE id = ?');
    return stmt.get(id);
  },

  findByEspecialidade(especialidade) {
    const stmt = db.prepare('SELECT * FROM profissionais WHERE especialidade LIKE ?');
    return stmt.all(`%${especialidade}%`);
  },

  findByCrm(crm) {
    const stmt = db.prepare('SELECT * FROM profissionais WHERE crm = ?');
    return stmt.get(crm);
  },

  create(profissional) {
    const stmt = db.prepare(`
      INSERT INTO profissionais (nome, especialidade, crm, telefone, email) 
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      profissional.nome, 
      profissional.especialidade, 
      profissional.crm, 
      profissional.telefone, 
      profissional.email
    );
    return { id: result.lastInsertRowid, ...profissional };
  },

  update(id, profissionalData) {
    const fields = [];
    const values = [];
    
    if (profissionalData.nome) {
      fields.push('nome = ?');
      values.push(profissionalData.nome);
    }
    if (profissionalData.especialidade) {
      fields.push('especialidade = ?');
      values.push(profissionalData.especialidade);
    }
    if (profissionalData.crm) {
      fields.push('crm = ?');
      values.push(profissionalData.crm);
    }
    if (profissionalData.telefone) {
      fields.push('telefone = ?');
      values.push(profissionalData.telefone);
    }
    if (profissionalData.email) {
      fields.push('email = ?');
      values.push(profissionalData.email);
    }
    
    if (fields.length === 0) return this.getById(id);
    
    values.push(id);
    const stmt = db.prepare(`UPDATE profissionais SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    
    return this.getById(id);
  },

  delete(id) {
    const stmt = db.prepare('DELETE FROM profissionais WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
};

export default repository;
