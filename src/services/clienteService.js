import repo from '../repositories/clienteRepository.js';

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
      throw { status: 404, message: 'Cliente não encontrado' };
    }
    return item;
  },

  create(clienteData) {
    if (!clienteData.nome || !clienteData.cpf) {
      throw { status: 400, message: 'Nome e CPF são obrigatórios' };
    }

    const existente = repo.findByCpf(clienteData.cpf);
    if (existente) {
      throw { status: 409, message: 'CPF já cadastrado' };
    }

    return repo.create(clienteData);
  },

  update(id, clienteData) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const existe = repo.getById(id);
    if (!existe) {
      throw { status: 404, message: 'Cliente não encontrado' };
    }

    return repo.update(id, clienteData);
  },

  delete(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const existe = repo.getById(id);
    if (!existe) {
      throw { status: 404, message: 'Cliente não encontrado' };
    }

    const result = repo.delete(id);
    return result;
  }
};

export default service;
