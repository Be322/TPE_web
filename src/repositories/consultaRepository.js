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

  create(consulta) {
    const stmt = db.prepare(`
      INSERT INTO consultas (clienteId, profissionalId, data, horario, status) 
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      consulta.clienteId,
      consulta.profissionalId,
      consulta.data,
      consulta.horario,
      consulta.status || 'agendada'
    );
    return { id: result.lastInsertRowid, ...consulta, status: consulta.status || 'agendada' };
  },

  update(id, consultaData) {
    const fields = [];
    const values = [];
    
    if (consultaData.clienteId) {
      fields.push('clienteId = ?');
      values.push(consultaData.clienteId);
    }
    if (consultaData.profissionalId) {
      fields.push('profissionalId = ?');
      values.push(consultaData.profissionalId);
    }
    if (consultaData.data) {
      fields.push('data = ?');
      values.push(consultaData.data);
    }
    if (consultaData.horario) {
      fields.push('horario = ?');
      values.push(consultaData.horario);
    }
    if (consultaData.status) {
      fields.push('status = ?');
      values.push(consultaData.status);
    }
    
    if (fields.length === 0) return this.getById(id);
    
    values.push(id);
    const stmt = db.prepare(`UPDATE consultas SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    
    return this.getById(id);
  },

  delete(id) {
    const stmt = db.prepare('DELETE FROM consultas WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
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

export default repository;
