import express from 'express';
import conexao from '../database/conexao.js';
import { autenticar } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', autenticar, async (req, res) => {
  const { nome_cliente, email_cliente, telefone_cliente, itens } = req.body;

  if (!itens || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ error: 'Itens da venda são obrigatórios' });
  }

  const conn = await conexao.getConnection();

  try {
    await conn.beginTransaction();

    let total = 0;

    // 1. validar produtos e calcular total
    for (const item of itens) {
      const [rows] = await conn.query(
        'SELECT preco, estoque FROM produtos WHERE id = ?',
        [item.id_produto]
      );

      const produto = rows[0];

      if (!produto) {
        throw new Error(`Produto ${item.id_produto} não encontrado`);
      }

      if (produto.estoque < item.quantidade) {
        throw new Error(`Estoque insuficiente para produto ${item.id_produto}`);
      }

      total += produto.preco * item.quantidade;
    }

    // 2. criar venda
    const [vendaResult] = await conn.query(
      'INSERT INTO vendas (nome_cliente, email_cliente, telefone_cliente, total) VALUES (?, ?, ?, ?)',
      [nome_cliente, email_cliente, telefone_cliente, total]
    );

    const vendaId = vendaResult.insertId;

    // 3. inserir itens + atualizar estoque
    for (const item of itens) {
      const [rows] = await conn.query(
        'SELECT preco FROM produtos WHERE id = ?',
        [item.id_produto]
      );

      const produto = rows[0];

      await conn.query(
        'INSERT INTO itens_venda (id_venda, id_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
        [vendaId, item.id_produto, item.quantidade, produto.preco]
      );

      await conn.query(
        'UPDATE produtos SET estoque = estoque - ? WHERE id = ?',
        [item.quantidade, item.id_produto]
      );
    }

    await conn.commit();

    res.status(201).json({
      message: 'Venda registrada com sucesso',
      vendaId,
      total
    });

  } catch (error) {
    await conn.rollback();

    res.status(400).json({
      error: error.message || 'Erro ao registrar venda'
    });

  } finally {
    conn.release();
  }
});

export default router;