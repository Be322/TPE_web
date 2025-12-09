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
    const { nomeCliente, mesa } = data;

    if (!nomeCliente || !mesa) {
      throw { status: 400, message: 'Nome do cliente e mesa são obrigatórios' };
    }

    return repo.create(data);
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
