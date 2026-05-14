import express from 'express';
import conexao from '../database/conexao.js';
import { autenticar } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', autenticar, async (req, res) => {
  const id_usuario = req.usuario.id;

  try {
    const [rows] = await conexao.query(
      `SELECT p.*
       FROM favoritos f
       JOIN produtos p ON p.id = f.id_produto
       WHERE f.id_usuario = ?`,
      [id_usuario]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar favoritos' });
  }
});

router.post('/', autenticar, async (req, res) => {
  const id_usuario = req.usuario.id;
  const { id_produto } = req.body;

  try {
    await conexao.query(
      `INSERT INTO favoritos (id_usuario, id_produto)
       VALUES (?, ?)`,
      [id_usuario, id_produto]
    );

    res.status(201).json({ message: 'Favorito adicionado' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Já está nos favoritos' });
    }

    res.status(500).json({ error: 'Erro ao adicionar favorito' });
  }
});

router.delete('/:id_produto', autenticar, async (req, res) => {
  const id_usuario = req.usuario.id;
  const { id_produto } = req.params;

  try {
    const [result] = await conexao.query(
      `DELETE FROM favoritos
       WHERE id_usuario = ? AND id_produto = ?`,
      [id_usuario, id_produto]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Favorito não encontrado' });
    }

    res.json({ message: 'Favorito removido' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover favorito' });
  }
});

export default router;