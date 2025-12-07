import controller from '../controllers/produtoController';

export default (app) => {
  app.get('/produto', controller.get);
  app.get('/produto/categoria/:idCategoria', controller.getProdutoByIdCategoria);
  app.get('/produto/:id', controller.get);
  app.post('/produto/create', controller.create);
  app.patch('/produto/update/:id', controller.update);
  app.delete('/produto/delete/:id', controller.destroy);
};
