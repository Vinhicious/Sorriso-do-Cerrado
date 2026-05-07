import express from 'express';
import ProdutoController from '../controllers/produtoController.js';
import { autenticar, autorizar } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', ProdutoController.listar);
router.get('/:id', ProdutoController.buscarPorId);

router.post(
  '/',
  autenticar,
  autorizar('artesa', 'admin'),
  ProdutoController.criar
);

router.put(
  '/:id',
  autenticar,
  autorizar('artesa', 'admin'),
  ProdutoController.atualizar
);

router.delete(
  '/:id',
  autenticar,
  autorizar('artesa', 'admin'),
  ProdutoController.deletar
);

export default router;