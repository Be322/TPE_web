import controller from '../controllers/categoriaController';

export default (app) => {
  app.get('/categoria', controller.get);
  app.get('/categoria/:id', controller.get);
  app.post('/categoria/create', controller.create);
  app.patch('/categoria/update/:id', controller.update);
  app.delete('/categoria/delete/:id', controller.destroy);
};
