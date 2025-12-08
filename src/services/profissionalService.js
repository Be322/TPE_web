const repo = require('../repositories/profissionalRepository');

const service = {
  list() {
    return repo.getAll();
  },

  get(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }
    
    const item = repo.getById(id);
    if (!item) {
      throw { status: 404, message: 'Profissional não encontrado' };
    }
    return item;
  },

  findByEspecialidade(especialidade) {
    if (!especialidade || especialidade.trim().length === 0) {
      throw { status: 400, message: 'Especialidade é obrigatória' };
    }
    
    const profissionais = repo.findByEspecialidade(especialidade);
    return profissionais;
  },

  create(profissionalData) {
    if (!profissionalData.nome || !profissionalData.crm || !profissionalData.especialidade) {
      throw { status: 400, message: 'Nome, CRM e Especialidade são obrigatórios' };
    }

    const existente = repo.findByCrm(profissionalData.crm);
    if (existente) {
      throw { status: 409, message: 'CRM já cadastrado' };
    }

    return repo.create(profissionalData);
  },

  update(id, profissionalData) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const existe = repo.getById(id);
    if (!existe) {
      throw { status: 404, message: 'Profissional não encontrado' };
    }

    return repo.update(id, profissionalData);
  },

  delete(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const existe = repo.getById(id);
    if (!existe) {
      throw { status: 404, message: 'Profissional não encontrado' };
    }

    const result = repo.delete(id);
    return result;
  }
};

module.exports = service;
