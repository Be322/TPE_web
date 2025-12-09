import repo from '../repositories/cardapioRepository.js';

const cardapioService = {
  list() {
    return repo.getAll();
  },

  get(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const item = repo.getById(id);
    if (!item) {
      throw { status: 404, message: 'Item do cardápio não encontrado' };
    }

    return item;
  },

  create(data) {
    if (!data.nome || !data.preco) {
      throw { status: 400, message: 'Nome e preço são obrigatórios' };
    }

    if (isNaN(data.preco)) {
      throw { status: 400, message: 'Preço inválido' };
    }

    return repo.create(data);
  },

  update(id, data) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const existe = repo.getById(id);
    if (!existe) {
      throw { status: 404, message: 'Item não encontrado' };
    }

    return repo.update(id, data);
  },

  delete(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const existe = repo.getById(id);
    if (!existe) {
      throw { status: 404, message: 'Item não encontrado' };
    }

    return repo.delete(id);
  }
};

export default cardapioService;
