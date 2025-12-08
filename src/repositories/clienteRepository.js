let clientes = [
  { id: 1, nome: 'João Silva', cpf: '123.456.789-00', telefone: '(11) 98765-4321', email: 'joao@email.com' },
  { id: 2, nome: 'Maria Santos', cpf: '987.654.321-00', telefone: '(11) 91234-5678', email: 'maria@email.com' },
  { id: 3, nome: 'Pedro Oliveira', cpf: '456.789.123-00', telefone: '(11) 99876-5432', email: 'pedro@email.com' }
];

const repository = {
  getAll() {
    return clientes;
  },

  getById(id) {
    return clientes.find(c => c.id == id);
  },

  findByName(nome) {
    return clientes.find(c => c.nome.toLowerCase().includes(nome.toLowerCase()));
  },

  findByCpf(cpf) {
    return clientes.find(c => c.cpf === cpf);
  },

  create(cliente) {
    const newId = Math.max(...clientes.map(c => c.id), 0) + 1;
    const newCliente = { id: newId, ...cliente };
    clientes.push(newCliente);
    return newCliente;
  },

  update(id, clienteData) {
    const index = clientes.findIndex(c => c.id == id);
    if (index === -1) return null;
    clientes[index] = { ...clientes[index], ...clienteData };
    return clientes[index];
  },

  delete(id) {
    const index = clientes.findIndex(c => c.id == id);
    if (index === -1) return false;
    clientes.splice(index, 1);
    return true;
  }
};

module.exports = repository;
