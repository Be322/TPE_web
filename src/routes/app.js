import express from 'express';
import simpleLogger from '../middlewares/simpleLogger.js';
import clienteController from '../controllers/clienteController.js';
import profissionalController from '../controllers/profissionalController.js';
import consultaController from '../controllers/consultaController.js';

const router = express.Router();

router.use(simpleLogger);

router.get('/clientes', clienteController.list);
router.get('/clientes/:id', clienteController.getById);
// Clientes: somente leitura

router.get('/profissionais', profissionalController.list);
router.get('/profissionais/:id', profissionalController.getById);
router.get('/profissionais/especialidade', profissionalController.findByEspecialidade);
router.post('/profissionais', profissionalController.create);
router.put('/profissionais/:id', profissionalController.update);
router.delete('/profissionais/:id', profissionalController.delete);

router.get('/consultas', consultaController.list);
router.get('/consultas/:id', consultaController.getById);
router.get('/consultas/cliente/:clienteId', consultaController.listByCliente);
router.get('/consultas/dias-disponiveis', consultaController.getAvailableDays);
router.get('/consultas/horarios', consultaController.getTimeSlots);
// Consultas: somente leitura

export default router;