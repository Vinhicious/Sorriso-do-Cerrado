import conexao from '../database/conexao.js';

const BannerModel = {
  listar: async () => {
    const [rows] = await conexao.query(
      'SELECT * FROM banners WHERE ativo = true ORDER BY ordem ASC'
    );
    return rows;
  },

  criar: async (banner) => {
    const { titulo, imagemURL, link, ordem } = banner;

    const [result] = await conexao.query(
      `INSERT INTO banners (titulo, imagemURL, link, ordem)
       VALUES (?, ?, ?, ?)`,
      [titulo, imagemURL, link, ordem]
    );

    return { id: result.insertId, ...banner };
  },

  atualizar: async (id, banner) => {
    const { titulo, imagemURL, link, ordem } = banner;

    const [result] = await conexao.query(
      `UPDATE banners 
       SET titulo=?, imagemURL=?, link=?, ordem=?
       WHERE id=?`,
      [titulo, imagemURL, link, ordem, id]
    );

    return result.affectedRows > 0;
  }
};

export default BannerModel;