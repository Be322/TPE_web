// Controller - Camada de controle HTTP
// Responsável por: receber requisições HTTP, validações superficiais, chamar services

const service = require('../services/clienteService');

module.exports = {
  list(req, res) {
    try {
      const clientes = service.list();
      res.status(200).json(clientes);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  getById(req, res) {
    try {
      const id = req.params.id;
      const cliente = service.get(id);
      res.status(200).json(cliente);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  create(req, res) {
    try {
      // Validação superficial da requisição
      if (!req.body) {
        return res.status(400).json({ error: 'Corpo da requisição vazio' });
      }

      const novoCliente = service.create(req.body);
      res.status(201).json(novoCliente);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  update(req, res) {
    try {
      const id = req.params.id;
      
      // Validação superficial
      if (!req.body) {
        return res.status(400).json({ error: 'Corpo da requisição vazio' });
      }

      const clienteAtualizado = service.update(id, req.body);
      res.status(200).json(clienteAtualizado);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  delete(req, res) {
    try {
      const id = req.params.id;
      service.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },
  
  login(req, res) {
    try {
      // Validação superficial
      if (!req.body || !req.body.nome) {
        return res.status(400).json({ error: 'Nome é obrigatório' });
      }

      const nome = req.body.nome;
      const cliente = service.login(nome);
      
      // Gerenciar sessão no controller (lógica de HTTP)
      req.session.clientId = cliente.id;
      
      res.status(200).json({ message: 'Login realizado com sucesso', cliente });
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  }
};
