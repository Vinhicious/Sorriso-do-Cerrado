import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import produtosRoutes from './routes/produtos.js';
import usuariosRoutes from './routes/usuarios.js';
import vendasRoutes from './routes/vendas.js';
import uploadRoutes from './routes/upload.js';
import bannersRoutes from './routes/banners.js';
import favoritosRoutes from './routes/favoritos.js';

import conexao, { criarBanco, criarTabelas } from './database/conexao.js';
import { criarAdminPadrao, criarBannersPadrao } from './database/seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

app.use('/produtos', produtosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/vendas', vendasRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/banners', bannersRoutes);
app.use('/upload', uploadRoutes);
app.use('/favoritos', favoritosRoutes);

app.get('/', (req, res) => {
  res.send('API do Sorriso do Cerrado está funcionando!');
});

app.options(/.*/, cors());

const esperarMySQL = async () => {
  for (let i = 0; i < 20; i++) {
    try {
      await conexao.query('SELECT 1');
      console.log('MySQL conectado ✔');
      return;
    } catch (err) {
      console.log('Aguardando MySQL...');
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  throw new Error('MySQL não respondeu a tempo');
};

async function iniciar() {
  try {
    await esperarMySQL();

    await criarBanco();
    await criarTabelas();
    await criarAdminPadrao();
    await criarBannersPadrao();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

  } catch (err) {
    console.error('Erro ao iniciar aplicação:', err);
    process.exit(1);
  }
}

iniciar();