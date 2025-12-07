import controller from '../controllers/administradorController';

export default (app) => {
  app.get('/administrador', controller.get);
  app.get('/administrador/:cpf', controller.get);
  app.post('/administrador/create', controller.create);
  app.patch('/administrador/update/:cpf', controller.update);
  app.delete('/administrador/delete/:cpf', controller.destroy);
};
