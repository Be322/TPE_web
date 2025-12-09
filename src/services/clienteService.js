import repo from '../repositories/clienteRepository.js';

const clienteService = {
  list() {
    return repo.getAll();
  },

  get(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const cliente = repo.getById(id);
    if (!cliente) {
      throw { status: 404, message: 'Cliente não encontrado' };
    }

    return cliente;
  },

  create(data) {
    if (!data.nome || data.nome.trim().length === 0) {
      throw { status: 400, message: 'Nome é obrigatório' };
    }

    if (data.documento) {
      const existe = repo.findByDocumento(data.documento);
      if (existe) {
        throw { status: 409, message: 'Documento já cadastrado' };
      }
    }

    return repo.create(data);
  },

  update(id, data) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const existe = repo.getById(id);
    if (!existe) {
      throw { status: 404, message: 'Cliente não encontrado' };
    }

    if (data.documento) {
      const duplicado = repo.findByDocumento(data.documento);
      if (duplicado && duplicado.id !== Number(id)) {
        throw { status: 409, message: 'Documento já está em uso' };
      }
    }

    return repo.update(id, data);
  },

  delete(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const existe = repo.getById(id);
    if (!existe) {
      throw { status: 404, message: 'Cliente não encontrado' };
    }

    repo.delete(id);
    return { message: 'Cliente removido com sucesso' };
  }
};

export default clienteService;
