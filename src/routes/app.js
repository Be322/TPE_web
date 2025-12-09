import { Router } from 'express';

import simpleLogger from '../middlewares/simpleLogger.js';

import clienteController from '../controllers/clienteController.js';
import cardapioController from '../controllers/cardapioController.js';
import pedidoController from '../controllers/pedidoController.js';
import comandaController from '../controllers/comandaController.js';

const router = Router();

router.use(simpleLogger);

router.get('/', (req, res) => {
  res.send('API do Cardápio Digital funcionando!');
});

router.get('/clientes', clienteController.list);
router.get('/clientes/:id', clienteController.getById);
router.post('/clientes', clienteController.create);
router.put('/clientes/:id', clienteController.update);
router.delete('/clientes/:id', clienteController.remove);

router.get('/produtos', cardapioController.list);
router.get('/produtos/:id', cardapioController.getById);
router.post('/produtos', cardapioController.create);
router.put('/produtos/:id', cardapioController.update);
router.delete('/produtos/:id', cardapioController.remove);

router.get('/pedidos', pedidoController.list);
router.get('/pedidos/:id', pedidoController.getById);
router.post('/pedidos', pedidoController.create);
router.put('/pedidos/:id', pedidoController.update);
router.delete('/pedidos/:id', pedidoController.remove);

router.get('/comandas', comandaController.list);
router.get('/comandas/:id', comandaController.getById);
router.post('/comandas', comandaController.create);
router.put('/comandas/:id', comandaController.update);
router.delete('/comandas/:id', comandaController.remove);

export default router;
