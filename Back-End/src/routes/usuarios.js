import express from 'express';
import conexao from '../database/conexao.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { autenticar, autorizar } from '../middleware/authMiddleware.js';

const router = express.Router();
const secret = process.env.JWT_SECRET || 'segredo';

// LOGIN - público
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [usuarios] = await conexao.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (usuarios.length === 0) {
      return res.status(400).json({ error: 'Usuário ou senha inválidos' });
    }

    const usuario = usuarios[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ error: 'Usuário ou senha inválidos' });
    }

    const token = jwt.sign({ id: usuario.id, papel: usuario.papel }, secret, { expiresIn: '8h' });
    res.json({
      token,
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      papel: usuario.papel
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no login' });
  }
});

// REGISTER - só admin pode
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  const role = 'cliente';
  try {
    const [existe] = await conexao.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existe.length > 0) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const hashSenha = await bcrypt.hash(senha, 10);
    const [result] = await conexao.query(
      'INSERT INTO usuarios (nome, email, senha, papel) VALUES (?, ?, ?, ?)',
      [nome, email, hashSenha, papel || 'artesa']
    );
    res.status(201).json({ id: result.insertId, nome, email, papel: papel || 'artesa' });
  } catch {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// GET /usuarios/:id - admin apenas
router.get('/:id', autenticar, autorizar('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const [usuarios] = await conexao.query(
      'SELECT id, nome, email, papel FROM usuarios WHERE id = ?',
      [id]
    );
    if (usuarios.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuarios[0]);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// PUT /usuarios/:id - admin apenas
router.put('/:id', autenticar, autorizar('admin'), async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, papel } = req.body;

  try {
    const hashSenha = senha ? await bcrypt.hash(senha, 10) : undefined;
    const [result] = await conexao.query(
      'UPDATE usuarios SET nome = ?, email = ?, senha = COALESCE(?, senha), papel = ? WHERE id = ?',
      [nome, email, hashSenha, papel, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.json({ id, nome, email, papel });
  } catch {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// DELETE /usuarios/:id - admin apenas
router.delete('/:id', autenticar, autorizar('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await conexao.query('DELETE FROM usuarios WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

export default router;
