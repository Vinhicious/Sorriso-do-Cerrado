import conexao from './conexao.js';
import bcrypt from 'bcryptjs';

export const criarAdminPadrao = async () => {
  try {
    const [rows] = await conexao.query(
      "SELECT id FROM usuarios WHERE papel = 'admin' LIMIT 1"
    );

    if (rows.length > 0) {
      console.log('Admin já existe');
      return;
    }

    const senhaHash = await bcrypt.hash('admin123', 10);

    await conexao.query(
      'INSERT INTO usuarios (nome, email, senha, papel) VALUES (?, ?, ?, ?)',
      ['Admin', 'admin@email.com', senhaHash, 'admin']
    );

    console.log('Admin criado: admin@email.com / admin123');
  } catch (err) {
    console.error('Erro ao criar admin:', err);
  }
};