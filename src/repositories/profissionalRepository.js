let profissionais = [
  { id: 1, nome: 'Dr. Carlos Mendes', especialidade: 'Cardiologia', crm: '12345-SP', telefone: '(11) 3000-0001', email: 'carlos@clinica.com' },
  { id: 2, nome: 'Dra. Ana Paula', especialidade: 'Dermatologia', crm: '23456-SP', telefone: '(11) 3000-0002', email: 'ana@clinica.com' },
  { id: 3, nome: 'Dr. Roberto Lima', especialidade: 'Ortopedia', crm: '34567-SP', telefone: '(11) 3000-0003', email: 'roberto@clinica.com' },
  { id: 4, nome: 'Dra. Juliana Costa', especialidade: 'Pediatria', crm: '45678-SP', telefone: '(11) 3000-0004', email: 'juliana@clinica.com' }
];

const repository = {
  getAll() {
    return profissionais;
  },

  getById(id) {
    return profissionais.find(p => p.id == id);
  },

  findByEspecialidade(especialidade) {
    return profissionais.filter(p => 
      p.especialidade.toLowerCase().includes(especialidade.toLowerCase())
    );
  },

  findByCrm(crm) {
    return profissionais.find(p => p.crm === crm);
  },

  create(profissional) {
    const newId = Math.max(...profissionais.map(p => p.id), 0) + 1;
    const newProfissional = { id: newId, ...profissional };
    profissionais.push(newProfissional);
    return newProfissional;
  },

  update(id, profissionalData) {
    const index = profissionais.findIndex(p => p.id == id);
    if (index === -1) return null;
    profissionais[index] = { ...profissionais[index], ...profissionalData };
    return profissionais[index];
  },

  delete(id) {
    const index = profissionais.findIndex(p => p.id == id);
    if (index === -1) return false;
    profissionais.splice(index, 1);
    return true;
  }
};

module.exports = repository;
