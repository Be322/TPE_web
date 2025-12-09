import repo from '../repositories/consultaRepository.js';
import profissionalRepo from '../repositories/profissionalRepository.js';
import clienteRepo from '../repositories/clienteRepository.js';

const service = {
  list() {
    const consultas = repo.getAll();
    return consultas.map(c => {
      const profissional = profissionalRepo.getById(c.profissionalId);
      const cliente = clienteRepo.getById(c.clienteId);
      return {
        id: c.id,
        medico: profissional?.nome || 'Médico não encontrado',
        especialidade: profissional?.especialidade || 'N/A',
        cliente: cliente?.nome || 'Cliente não encontrado',
        data: c.data,
        horario: c.horario,
        status: c.status,
        icone: 'medical_services'
      };
    });
  },

  listByCliente(clienteId) {
    if (!clienteId || isNaN(clienteId)) {
      throw { status: 400, message: 'ID do cliente inválido' };
    }

    const cliente = clienteRepo.getById(clienteId);
    if (!cliente) {
      throw { status: 404, message: 'Cliente não encontrado' };
    }

    const consultas = repo.getByClienteId(clienteId);
    return consultas.map(c => {
      const profissional = profissionalRepo.getById(c.profissionalId);
      return {
        id: c.id,
        medico: profissional?.nome || 'Médico não encontrado',
        especialidade: profissional?.especialidade || '',
        data: c.data,
        horario: c.horario,
        status: c.status,
        icone: 'check_circle'
      };
    });
  },

  get(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }
    
    const item = repo.getById(id);
    if (!item) {
      throw { status: 404, message: 'Consulta não encontrada' };
    }
    return item;
  },

  formatDate(date) {
    return repo.formatDate(date);
  },

  nextAvailableDays(count = 21) {
    return repo.nextAvailableDays(count);
  },


  renderTimeSlots(date) {
    if (!date) {
      throw { status: 400, message: 'Data é obrigatória' };
    }
    return repo.renderTimeSlots(date);
  },

  
};

export default service;
