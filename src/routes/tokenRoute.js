import controller from '../controllers/tokenController';

export default (app) => {
  app.get('/token', controller.get);
  app.get('/token/:id', controller.get);
  app.post('/token/create', controller.create);
  app.patch('/token/update/:id', controller.update);
  app.delete('/token/delete/:id', controller.destroy);
};
