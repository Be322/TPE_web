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
  
};

export default service;
