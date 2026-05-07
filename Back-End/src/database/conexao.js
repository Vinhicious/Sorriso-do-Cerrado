import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// conexão base (SEM database)
const baseConexao = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10
});

// cria banco
export const criarBanco = async () => {
  await baseConexao.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
  );
};

// conexão REAL (com database)
export const conexao = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

export const criarTabelas = async () => {
  await conexao.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      senha VARCHAR(255) NOT NULL,
      papel ENUM('admin', 'artesa') DEFAULT 'artesa'
    )
  `);

  await conexao.query(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      descricao TEXT,
      preco DECIMAL(10,2) NOT NULL,
      estoque INT DEFAULT 0,
      imagemURL VARCHAR(255)
    )
  `);

  await conexao.query(`
    CREATE TABLE IF NOT EXISTS vendas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome_cliente VARCHAR(100) NOT NULL,
      email_cliente VARCHAR(100),
      telefone_cliente VARCHAR(20),
      data DATETIME DEFAULT CURRENT_TIMESTAMP,
      total DECIMAL(10,2),
      status ENUM('pendente', 'confirmada', 'cancelada') DEFAULT 'pendente'
    )
  `);

  await conexao.query(`
    CREATE TABLE IF NOT EXISTS itens_venda (
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_venda INT NOT NULL,
      id_produto INT NOT NULL,
      quantidade INT NOT NULL,
      preco_unitario DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (id_venda) REFERENCES vendas(id) ON DELETE CASCADE,
      FOREIGN KEY (id_produto) REFERENCES produtos(id) ON DELETE CASCADE
    )
  `);

  await conexao.query(`
  CREATE TABLE IF NOT EXISTS favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_produto INT NOT NULL,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES produtos(id) ON DELETE CASCADE,
    UNIQUE KEY unique_fav (id_usuario, id_produto)
  )
`);
};

export default conexao;