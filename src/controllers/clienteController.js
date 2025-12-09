import service from '../services/clienteService.js';

export default {
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
  
};
