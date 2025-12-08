import service from '../services/profissionalService.js';

export default {
  list(req, res) {
    try {
      const profissionais = service.list();
      res.status(200).json(profissionais);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  getById(req, res) {
    try {
      const id = req.params.id;
      const profissional = service.get(id);
      res.status(200).json(profissional);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  findByEspecialidade(req, res) {
    try {
      const especialidade = req.query.especialidade;
      
      if (!especialidade) {
        return res.status(400).json({ error: 'Especialidade é obrigatória' });
      }

      const profissionais = service.findByEspecialidade(especialidade);
      res.status(200).json(profissionais);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
    }
  },

  create(req, res) {
    try {
      if (!req.body) {
        return res.status(400).json({ error: 'Corpo da requisição vazio' });
      }

      const novoProfissional = service.create(req.body);
      res.status(201).json(novoProfissional);
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

      const profissionalAtualizado = service.update(id, req.body);
      res.status(200).json(profissionalAtualizado);
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
  }
};
