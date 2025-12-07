import controller from '../controllers/pedidoController';

export default (app) => {
  app.get('/pedido', controller.get);
  app.get('/pedido/:id', controller.get);
  app.get('/pedido/produto/:idToken', controller.getProdutoByIdToken);
  app.post('/pedido/create', controller.create);
  app.patch('/pedido/update/:id', controller.update);
  app.delete('/pedido/delete/:id', controller.destroy);
};
