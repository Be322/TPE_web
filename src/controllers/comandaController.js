import service from '../services/comandaService.js';

export default {
  list(req, res) {
    try {
      const comandas = service.list();
      res.status(200).json(comandas);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  getById(req, res) {
    try {
      const id = req.params.id;
      const comanda = service.get(id);
      res.status(200).json(comanda);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  create(req, res) {
    try {
      const comanda = service.create(req.body);
      res.status(201).json(comanda);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  update(req, res) {
    try {
      const id = req.params.id;
      const comanda = service.update(id, req.body);
      res.status(200).json(comanda);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  remove(req, res) {
    try {
      const id = req.params.id;
      service.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  }
};
