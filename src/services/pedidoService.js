import repo from '../repositories/pedidoRepository.js';
import cardapioRepo from '../repositories/cardapioRepository.js';
import comandaRepo from '../repositories/comandaRepository.js';

const pedidoService = {
  list() {
    const pedidos = repo.getAll();
    return pedidos.map((p) => ({
      ...p,
      itens: repo.getItensByPedido(p.id)
    }));
  },

  get(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const pedido = repo.getById(id);
    if (!pedido) {
      throw { status: 404, message: 'Pedido não encontrado' };
    }

    return { ...pedido, itens: repo.getItensByPedido(pedido.id) };
  },

  create(data) {
    const { mesa, itens, comandaId } = data;

    if (!mesa) {
      throw { status: 400, message: 'Mesa é obrigatória' };
    }

    if (!Array.isArray(itens) || itens.length === 0) {
      throw { status: 400, message: 'Lista de itens é obrigatória' };
    }

    const itensValidados = itens.map((item) => {
      const produto = cardapioRepo.getById(item.produtoId);
      if (!produto) {
        throw { status: 404, message: `Produto ${item.produtoId} não encontrado` };
      }
      const quantidade = Number(item.quantidade || 0);
      if (!quantidade || quantidade <= 0) {
        throw { status: 400, message: 'Quantidade inválida' };
      }
      return { produtoId: produto.id, quantidade, preco: produto.preco };
    });

    const total = itensValidados.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    const pedidoResult = repo.createPedido({ mesa, total, status: 'aguardando' });
    const pedidoId = pedidoResult.lastInsertRowid;

    repo.addItens(pedidoId, itensValidados);

    let comandaDestinoId = comandaId;
    if (comandaDestinoId) {
      const existe = comandaRepo.getById(comandaDestinoId);
      if (!existe) {
        throw { status: 404, message: 'Comanda não encontrada' };
      }
    } else {
      const nova = comandaRepo.create({ mesa, status: 'aberta' });
      comandaDestinoId = nova.lastInsertRowid;
    }

    comandaRepo.addPedido({ comandaId: comandaDestinoId, pedidoId });

    return this.get(pedidoId);
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
