import service from '../services/cardapioService.js';

export default {
  list(req, res) {
    try {
      const produtos = service.list();
      res.status(200).json(produtos);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  getById(req, res) {
    try {
      const id = req.params.id;
      const produto = service.get(id);
      res.status(200).json(produto);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  create(req, res) {
    try {
      const produto = service.create(req.body);
      res.status(201).json(produto);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  update(req, res) {
    try {
      const id = req.params.id;
      const produto = service.update(id, req.body);
      res.status(200).json(produto);
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
