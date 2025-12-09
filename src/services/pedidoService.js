import repo from '../repositories/pedidoRepository.js';
import cardapioRepo from '../repositories/cardapioRepository.js';
import comandaRepo from '../repositories/comandaRepository.js';

const pedidoService = {
  list() {
    return repo.getAll();
  },

  get(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const pedido = repo.getById(id);
    if (!pedido) {
      throw { status: 404, message: 'Pedido não encontrado' };
    }

    return pedido;
  },

  listByComanda(comandaId) {
    if (!comandaId || isNaN(comandaId)) {
      throw { status: 400, message: 'ID da comanda inválido' };
    }

    return repo.getByComandaId(comandaId);
  },

  create(data) {
    const { itemId, quantidade, comandaId } = data;

    if (!itemId || !quantidade || !comandaId) {
      throw { status: 400, message: 'itemId, quantidade e comandaId são obrigatórios' };
    }

    if (!cardapioRepo.getById(itemId)) {
      throw { status: 404, message: 'Item do cardápio não encontrado' };
    }

    if (!comandaRepo.getById(comandaId)) {
      throw { status: 404, message: 'Comanda não encontrada' };
    }

    return repo.create(data);
  },

  delete(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const existe = repo.getById(id);
    if (!existe) {
      throw { status: 404, message: 'Pedido não encontrado' };
    }

    return repo.delete(id);
  }
};

export default pedidoService;
