const repo = require('../repositories/consultaRepository');
const profissionalRepo = require('../repositories/profissionalRepository');
const clienteRepo = require('../repositories/clienteRepository');

const service = {
  list() {
    return repo.getAll();
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

  create(consultaData) {
    if (!consultaData.clienteId || !consultaData.profissionalId || !consultaData.data || !consultaData.horario) {
      throw { status: 400, message: 'Cliente, Profissional, Data e Horário são obrigatórios' };
    }

    const cliente = clienteRepo.getById(consultaData.clienteId);
    if (!cliente) {
      throw { status: 404, message: 'Cliente não encontrado' };
    }

    const profissional = profissionalRepo.getById(consultaData.profissionalId);
    if (!profissional) {
      throw { status: 404, message: 'Profissional não encontrado' };
    }

    const horariosDisponiveis = repo.renderTimeSlots(consultaData.data);
    const horarioEscolhido = horariosDisponiveis.find(h => h.horario === consultaData.horario);
    
    if (!horarioEscolhido || !horarioEscolhido.disponivel) {
      throw { status: 409, message: 'Horário não disponível' };
    }

    return repo.create(consultaData);
  },

  update(id, consultaData) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const existe = repo.getById(id);
    if (!existe) {
      throw { status: 404, message: 'Consulta não encontrada' };
    }

    return repo.update(id, consultaData);
  },

  delete(id) {
    if (!id || isNaN(id)) {
      throw { status: 400, message: 'ID inválido' };
    }

    const existe = repo.getById(id);
    if (!existe) {
      throw { status: 404, message: 'Consulta não encontrada' };
    }

    const result = repo.delete(id);
    return result;
  },

  formatDate(date) {
    return repo.formatDate(date);
  },

  nextAvailableDays(count = 21) {
    return repo.nextAvailableDays(count);
  },

  defaultTimeSlots() {
    return repo.defaultTimeSlots();
  },

  renderTimeSlots(date) {
    if (!date) {
      throw { status: 400, message: 'Data é obrigatória' };
    }
    return repo.renderTimeSlots(date);
  },

  renderAgenda() {
    return repo.renderAgenda();
  },

  renderCalendar(doctor) {
    return repo.renderCalendar(doctor);
  },

  selectDate(element) {
    return repo.selectDate(element);
  },

  selectTime(element) {
    return repo.selectTime(element);
  }
};

module.exports = service;
