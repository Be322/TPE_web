import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.join(__dirname, "../../database.sqlite");
const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

const initDatabase = () => {

  db.exec(`
  CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT,
    email TEXT,
    documento TEXT UNIQUE
  )
`);


  db.exec(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      categoria TEXT NOT NULL,
      descricao TEXT,
      imagem TEXT
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mesa TEXT NOT NULL,
      total REAL NOT NULL,
      status TEXT DEFAULT 'aguardando',
      dataHora TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS itens_pedido (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pedidoId INTEGER NOT NULL,
      produtoId INTEGER NOT NULL,
      quantidade INTEGER NOT NULL,
      FOREIGN KEY (pedidoId) REFERENCES pedidos(id) ON DELETE CASCADE,
      FOREIGN KEY (produtoId) REFERENCES produtos(id)
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS comandas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mesa TEXT NOT NULL,
      status TEXT DEFAULT 'aberta',
      dataAbertura TEXT DEFAULT CURRENT_TIMESTAMP,
      dataFechamento TEXT
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS comanda_pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      comandaId INTEGER NOT NULL,
      pedidoId INTEGER NOT NULL,
      FOREIGN KEY (comandaId) REFERENCES comandas(id),
      FOREIGN KEY (pedidoId) REFERENCES pedidos(id)
    )
  `);

  const count = db.prepare("SELECT COUNT(*) AS total FROM produtos").get();

  if (count.total === 0) {
    const stmt = db.prepare(`
      INSERT INTO produtos (nome, preco, categoria, descricao, imagem)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run("Hambúrguer Artesanal", 25, "Lanches", "Pão brioche, carne 160g", "/img/hamburguer.jpg");
    stmt.run("Pizza Marguerita", 49, "Pizzas", "Mussarela, tomate e manjericão", "/img/pizza.jpg");
    stmt.run("Coca-Cola 350ml", 7, "Bebidas", "Refrigerante gelado", "/img/coca.jpg");

    console.log("🍔 Produtos padrão inseridos.");
  }
};

initDatabase();

export default db;
