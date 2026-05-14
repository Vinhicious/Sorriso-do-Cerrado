import conexao from '../database/conexao.js';

const ProdutoModel = {
  listarTodos: async () => {
    const [rows] = await conexao.query('SELECT * FROM produtos');
    return rows;
  },

  buscarPorId: async (id) => {
    const [rows] = await conexao.query(
      'SELECT * FROM produtos WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  criar: async (produto) => {
    const { nome, descricao, preco, estoque, imagemURL } = produto;

    const [result] = await conexao.query(
      `INSERT INTO produtos (nome, descricao, preco, estoque, imagemURL)
       VALUES (?, ?, ?, ?, ?)`,
      [nome, descricao, preco, estoque, imagemURL]
    );

    return { id: result.insertId, ...produto };
  },

  atualizar: async (id, produto) => {
    const { nome, descricao, preco, estoque, imagemURL } = produto;

    const [result] = await conexao.query(
      `UPDATE produtos 
       SET nome=?, descricao=?, preco=?, estoque=?, imagemURL=?
       WHERE id=?`,
      [nome, descricao, preco, estoque, imagemURL, id]
    );

    return result.affectedRows > 0;
  },

  deletar: async (id) => {
    const [result] = await conexao.query(
      'DELETE FROM produtos WHERE id = ?',
      [id]
    );

    return result.affectedRows > 0;
  }

  
};

export default ProdutoModel;