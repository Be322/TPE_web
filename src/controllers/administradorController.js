import AdministradorModel from '../models/AdministradorModel';

const get = async (req, res) => {
  try {
    const cpf = req.params.cpf ? req.params.cpf.toString().replace(/\D/g, '') : null;

    if (!cpf) {
      const response = await AdministradorModel.findAll({
        order: [['cpf', 'asc']],
      });
      return res.status(200).send({
        message: 'Dados Encontrados!',
        response,
      });
    }

    const response = await AdministradorModel.findOne({
      where: {
        cpf,
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

const create = async (req, res) => {
  try {
    const {
      cpf, nome,
    } = req.body;

    const response = await AdministradorModel.create({
      cpf, nome,
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
    const cpf = req.params.cpf ? req.params.cpf.toString().replace(/\D/g, '') : null;

    if (!cpf) {
      return res.status(400).send({
        message: 'cpf não informado',
        response: [],
      });
    }

    const response = await AdministradorModel.findOne({
      where: {
        cpf,
      },
    });

    if (!response) {
      return res.status(404).send({
        message: 'cpf Não Encontrado na Base de Dados',
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
    const cpf = req.params.cpf ? req.params.cpf.toString().replace(/\D/g, '') : null;

    if (!cpf) {
      return res.status(400).send({
        message: 'cpf não informado',
        response: [],
      });
    }

    const response = await AdministradorModel.findOne({
      where: {
        cpf,
      },
    });

    if (!response) {
      return res.status(500).send({
        message: 'cpf Não Encontrado na Base',
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
  create,
  update,
  destroy,
};
