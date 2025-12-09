import service from '../services/clienteService.js';

const clienteController = {
  list(req, res) {
    try {
      const clientes = service.list();
      res.json(clientes);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  },

  getById(req, res) {
    try {
      const cliente = service.get(req.params.id);
      res.json(cliente);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  },

  create(req, res) {
    try {
      const cliente = service.create(req.body);
      res.status(201).json(cliente);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  },

  update(req, res) {
    try {
      const cliente = service.update(req.params.id, req.body);
      res.json(cliente);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  },

  remove(req, res) {
    try {
      const result = service.delete(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }
};

export default clienteController;
