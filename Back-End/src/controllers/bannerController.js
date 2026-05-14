import BannerModel from '../models/bannerModel.js';

export const listarBanners = async (req, res) => {
  try {
    const banners = await BannerModel.listar();
    res.json(banners);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar banners' });
  }
};

export const criarBanner = async (req, res) => {
  try {
    const banner = await BannerModel.criar(req.body);
    res.status(201).json(banner);
  } catch {
    res.status(500).json({ error: 'Erro ao criar banner' });
  }
};

export const atualizarBanner = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const { titulo, link, ordem } = req.body || {};

    const imagemURL = req.file
      ? `http://localhost:3000/uploads/${req.file.filename}`
      : null;

    const ok = await BannerModel.atualizar(req.params.id, {
      titulo,
      imagemURL,
      link,
      ordem
    });

    if (!ok) {
      return res.status(404).json({ error: 'Banner não encontrado' });
    }

    res.json({ message: 'Banner atualizado' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao atualizar banner' });
  }
};