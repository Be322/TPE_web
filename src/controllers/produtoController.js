import ProdutoModel from '../models/ProdutoModel';

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await ProdutoModel.findAll({
        order: [['id', 'asc']],
      });
      return res.status(200).send({
        message: 'Dados Encontrados!',
        response,
      });
    }

    const response = await ProdutoModel.findOne({
      where: {
        id,
      },
    });

    return res.status(200).send({
      message: 'Dados Encontrados!',
      response,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops!',
      response: error.message,
    });
  }
};

const getProdutoByIdCategoria = async (req, res) => {
  try {
    const idCategoria = req.params.idCategoria ? req.params.idCategoria.toString().replace(/\D/g, '') : null;

    if (!idCategoria || Number.isNaN(Number(idCategoria))) {
      return res.status(400).send({
        message: 'ID da categoria é obrigatório e deve ser um número válido.',
      });
    }

    const response = await ProdutoModel.findAll({
      where: {
        idCategoria,
      },
    });

    if (!response || response.length === 0) {
      return res.status(404).send({
        message: 'Nenhum produto encontrado para esta categoria.',
      });
    }

    return res.status(200).send({
      message: 'Dados encontrados!',
      response,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops! Ocorreu um erro no servidor.',
      response: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const {
      id, nome, descricaoProduto, valor, imagem, idCategoria,
    } = req.body;

    const response = await ProdutoModel.create({
      id, nome, descricaoProduto, valor, imagem, idCategoria,
    });

    return res.status(201).send({
      message: 'Dados Criados!',
      response,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops!',
      response: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      return res.status(400).send({
        message: 'id não informado',
        response: [],
      });
    }

    const response = await ProdutoModel.findOne({
      where: {
        id,
      },
    });

    if (!response) {
      return res.status(404).send({
        message: 'id Não Encontrado na Base de Dados',
        response: [],
      });
    }

    Object.keys(req.body).forEach((chave) => {
      response[chave] = req.body[chave];
    });

    await response.save();
    return res.status(201).send({
      message: 'Dados Atualizados',
      response,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops!',
      response: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      return res.status(400).send({
        message: 'id não informado',
        response: [],
      });
    }

    const response = await ProdutoModel.findOne({
      where: {
        id,
      },
    });

    if (!response) {
      return res.status(500).send({
        message: 'id Não Encontrado na Base',
        response: [],
      });
    }

    await response.destroy();

    return res.status(200).send({
      message: 'Usuário deletado com sucesso',
      response: [],
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops!',
      response: error.message,
    });
  }
};

export default {
  get,
  getProdutoByIdCategoria,
  create,
  update,
  destroy,
};
