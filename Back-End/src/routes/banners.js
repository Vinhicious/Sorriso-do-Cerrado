import express from 'express';
import {
  listarBanners,
  criarBanner,
  atualizarBanner
} from '../controllers/bannerController.js';

import { autenticar, autorizar } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', listarBanners);

router.post(
  '/',
  autenticar,
  autorizar('admin'),
  upload.single('imagem'),
  criarBanner
);

router.put(
  '/:id',
  autenticar,
  autorizar('admin'),
  upload.single('imagem'),
  atualizarBanner
);

export default router;