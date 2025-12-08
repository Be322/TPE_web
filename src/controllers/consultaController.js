const service = require('../services/consultaService');

module.exports = {
  list(req, res) {
    try {
      const consultas = service.list();
      res.status(200).json(consultas);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  listByCliente(req, res) {
    try {
      const clienteId = req.session.clientId;
      if (!clienteId) {
        return res.status(401).json({ error: 'Não autenticado' });
      }
      
      const consultas = service.listByCliente(clienteId);
      res.status(200).json(consultas);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  getById(req, res) {
    try {
      const id = req.params.id;
      const consulta = service.get(id);
      res.status(200).json(consulta);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  create(req, res) {
    try {
      if (!req.body) {
        return res.status(400).json({ error: 'Corpo da requisição vazio' });
      }

      const novaConsulta = service.create(req.body);
      res.status(201).json(novaConsulta);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  update(req, res) {
    try {
      const id = req.params.id;
      
      if (!req.body) {
        return res.status(400).json({ error: 'Corpo da requisição vazio' });
      }

      const consultaAtualizada = service.update(id, req.body);
      res.status(200).json(consultaAtualizada);
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

  getAvailableDays(req, res) {
    try {
      const count = req.query.count || 21;
      const days = service.nextAvailableDays(parseInt(count));
      res.status(200).json(days);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  getTimeSlots(req, res) {
    try {
      const date = req.query.date;
      
      if (!date) {
        return res.status(400).json({ error: 'Data é obrigatória' });
      }

      const slots = service.renderTimeSlots(date);
      res.status(200).json(slots);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  }
};
