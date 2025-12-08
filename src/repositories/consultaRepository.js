let consultas = [
  { id: 1, clienteId: 1, profissionalId: 1, data: '2025-12-15', horario: '10:00', status: 'agendada' },
  { id: 2, clienteId: 1, profissionalId: 2, data: '2025-12-20', horario: '14:30', status: 'agendada' },
  { id: 3, clienteId: 2, profissionalId: 3, data: '2025-12-18', horario: '09:00', status: 'agendada' },
  { id: 4, clienteId: 3, profissionalId: 4, data: '2025-12-22', horario: '16:00', status: 'agendada' }
];

const repository = {
  getAll() {
    return consultas;
  },

  getById(id) {
    return consultas.find(c => c.id == id);
  },

  getByClienteId(clienteId) {
    return consultas.filter(c => c.clienteId == clienteId);
  },

  getByProfissionalId(profissionalId) {
    return consultas.filter(c => c.profissionalId == profissionalId);
  },

  getByData(data) {
    return consultas.filter(c => c.data === data);
  },

  create(consulta) {
    const newId = Math.max(...consultas.map(c => c.id), 0) + 1;
    const newConsulta = { id: newId, status: 'agendada', ...consulta };
    consultas.push(newConsulta);
    return newConsulta;
  },

  update(id, consultaData) {
    const index = consultas.findIndex(c => c.id == id);
    if (index === -1) return null;
    consultas[index] = { ...consultas[index], ...consultaData };
    return consultas[index];
  },

  delete(id) {
    const index = consultas.findIndex(c => c.id == id);
    if (index === -1) return false;
    consultas.splice(index, 1);
    return true;
  },

  formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  },

  nextAvailableDays(count = 21) {
    const days = [];
    const today = new Date();
    for (let i = 0; i < count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        formatted: this.formatDate(date)
      });
    }
    return days;
  },

  defaultTimeSlots() {
    return [
      '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
      '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', 
      '16:00', '16:30', '17:00', '17:30'
    ];
  },

  renderAgenda() {
    return { message: 'Renderizar agenda' };
  },

  renderCalendar(doctor) {
    return { message: 'Renderizar calendário', doctor };
  },

  selectDate(element) {
    return { selected: element };
  },

  renderTimeSlots(date) {
    const consultasNaData = this.getByData(date);
    const horariosOcupados = consultasNaData.map(c => c.horario);
    const todosHorarios = this.defaultTimeSlots();
    return todosHorarios.map(horario => ({
      horario,
      disponivel: !horariosOcupados.includes(horario)
    }));
  },

  selectTime(element) {
    return { selected: element };
  }
};

module.exports = repository;
