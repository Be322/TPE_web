import db from '../database/db.js';

const repository = {
  getAll() {
    const stmt = db.prepare('SELECT * FROM consultas');
    return stmt.all();
  },

  getById(id) {
    const stmt = db.prepare('SELECT * FROM consultas WHERE id = ?');
    return stmt.get(id);
  },

  getByClienteId(clienteId) {
    const stmt = db.prepare('SELECT * FROM consultas WHERE clienteId = ?');
    return stmt.all(clienteId);
  },

  getByProfissionalId(profissionalId) {
    const stmt = db.prepare('SELECT * FROM consultas WHERE profissionalId = ?');
    return stmt.all(profissionalId);
  },

  getByData(data) {
    const stmt = db.prepare('SELECT * FROM consultas WHERE data = ?');
    return stmt.all(data);
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


  renderTimeSlots(date) {
    const consultasNaData = this.getByData(date);
    const horariosOcupados = consultasNaData.map(c => c.horario);
    const todosHorarios = this.defaultTimeSlots();
    return todosHorarios.map(horario => ({
      horario,
      disponivel: !horariosOcupados.includes(horario)
    }));
  },

  
};

export default repository;
