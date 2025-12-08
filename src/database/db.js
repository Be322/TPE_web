import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.join(__dirname, '../../database.sqlite');
const db = new Database(dbPath);

db.pragma('foreign_keys = ON');

const initDatabase = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf TEXT UNIQUE NOT NULL,
      telefone TEXT,
      email TEXT
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS profissionais (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      especialidade TEXT NOT NULL,
      crm TEXT UNIQUE NOT NULL,
      telefone TEXT,
      email TEXT
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS consultas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clienteId INTEGER NOT NULL,
      profissionalId INTEGER NOT NULL,
      data TEXT NOT NULL,
      horario TEXT NOT NULL,
      status TEXT DEFAULT 'agendada',
      FOREIGN KEY (clienteId) REFERENCES clientes(id),
      FOREIGN KEY (profissionalId) REFERENCES profissionais(id)
    )
  `);

  const clienteCount = db.prepare('SELECT COUNT(*) as count FROM clientes').get();
  if (clienteCount.count === 0) {
    const insertCliente = db.prepare(`
      INSERT INTO clientes (nome, cpf, telefone, email) 
      VALUES (?, ?, ?, ?)
    `);

    insertCliente.run('João Silva', '123.456.789-00', '(11) 98765-4321', 'joao@email.com');
    insertCliente.run('Maria Santos', '987.654.321-00', '(11) 91234-5678', 'maria@email.com');
    insertCliente.run('Pedro Oliveira', '456.789.123-00', '(11) 99876-5432', 'pedro@email.com');
    
    console.log('✅ Dados iniciais de clientes inseridos');
  }

  const profissionalCount = db.prepare('SELECT COUNT(*) as count FROM profissionais').get();
  if (profissionalCount.count === 0) {
    const insertProfissional = db.prepare(`
      INSERT INTO profissionais (nome, especialidade, crm, telefone, email) 
      VALUES (?, ?, ?, ?, ?)
    `);

    insertProfissional.run('Dr. Carlos Mendes', 'Cardiologia', '12345-SP', '(11) 3000-0001', 'carlos@clinica.com');
    insertProfissional.run('Dra. Ana Paula', 'Dermatologia', '23456-SP', '(11) 3000-0002', 'ana@clinica.com');
    insertProfissional.run('Dr. Roberto Lima', 'Ortopedia', '34567-SP', '(11) 3000-0003', 'roberto@clinica.com');
    insertProfissional.run('Dra. Juliana Costa', 'Pediatria', '45678-SP', '(11) 3000-0004', 'juliana@clinica.com');
    
    console.log('✅ Dados iniciais de profissionais inseridos');
  }

  const consultaCount = db.prepare('SELECT COUNT(*) as count FROM consultas').get();
  if (consultaCount.count === 0) {
    const insertConsulta = db.prepare(`
      INSERT INTO consultas (clienteId, profissionalId, data, horario, status) 
      VALUES (?, ?, ?, ?, ?)
    `);

    insertConsulta.run(1, 1, '2025-12-15', '10:00', 'agendada');
    insertConsulta.run(1, 2, '2025-12-20', '14:30', 'agendada');
    insertConsulta.run(2, 3, '2025-12-18', '09:00', 'agendada');
    insertConsulta.run(3, 4, '2025-12-22', '16:00', 'agendada');
    
    console.log('✅ Dados iniciais de consultas inseridos');
  }
};

initDatabase();

export default db;
