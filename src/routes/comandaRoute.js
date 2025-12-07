import controller from '../controllers/comandaController';

export default (app) => {
  app.get('/comanda', controller.get);
  app.get('/comanda/:id', controller.get);
  app.post('/comanda/create', controller.create);
  app.patch('/comanda/update/:id', controller.update);
  app.delete('/comanda/delete/:id', controller.destroy);
};
