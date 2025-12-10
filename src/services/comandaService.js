import repo from '../repositories/comandaRepository.js';

const comandaService = {
  list() {
    return repo.getAll();
  },

  get(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const comanda = repo.getById(id);
    if (!comanda) {
      throw { status: 404, message: 'Comanda não encontrada' };
    }

    return comanda;
  },

  create(data) {
    const { mesa, status } = data;

    if (!mesa) {
      throw { status: 400, message: 'Mesa é obrigatória' };
    }

    return repo.create({ mesa, status });
  },

  update(id, data) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const atual = repo.getById(id);
    if (!atual) {
      throw { status: 404, message: 'Comanda não encontrada' };
    }

    const mesa = data.mesa ?? atual.mesa;
    const status = data.status ?? atual.status;

    if (!mesa) {
      throw { status: 400, message: 'Mesa é obrigatória' };
    }

    const dataFechamento = status === 'fechada' ? new Date().toISOString() : null;

    repo.update({ id, mesa, status, dataFechamento });
    return repo.getById(id);
  },

  delete(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const existe = repo.getById(id);
    if (!existe) {
      throw { status: 404, message: 'Comanda não encontrada' };
    }

    repo.delete(id);
    return { ok: true };
  },

  addPedidoToComanda(data) {
    const { comandaId, pedidoId } = data;

    if (!comandaId || !pedidoId) {
      throw { status: 400, message: 'comandaId e pedidoId são obrigatórios' };
    }

    if (!repo.getById(comandaId)) {
      throw { status: 404, message: 'Comanda não encontrada' };
    }

    return repo.addPedido(data);
  },

  getPedidos(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    return repo.getPedidos(id);
  }
};

export default comandaService;
