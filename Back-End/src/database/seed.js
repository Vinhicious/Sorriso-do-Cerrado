import conexao from './conexao.js';
import bcrypt from 'bcryptjs';

export const criarAdminPadrao = async () => {
  try {
    const [rows] = await conexao.query(
      "SELECT id FROM usuarios WHERE papel = 'admin' LIMIT 1"
    );

    if (rows.length > 0) {
      console.log('Admin já existe\nemail: admin@email.com\nsenha: admin123');
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

export const criarBannersPadrao = async () => {
  try {
    const [rows] = await conexao.query(`SELECT id FROM banners LIMIT 1`);

    if (rows.length > 0) {
      console.log('Banners já existem');
      return;
    }

    await conexao.query(`
      INSERT INTO banners (titulo, imagemURL, ordem) VALUES
      ('Banner Principal', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', 1),
      ('Banner Secundário', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', 2)
    `);

    console.log('Banners padrão criados');
  } catch (err) {
    console.error('Erro ao criar banners:', err);
  }
};