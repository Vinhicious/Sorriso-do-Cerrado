import ProdutoModel from '../models/produtoModel.js';

const ProdutoController = {
  listar: async (req, res) => {
    try {
      const produtos = await ProdutoModel.listarTodos();
      res.json(produtos);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const produto = await ProdutoModel.buscarPorId(req.params.id);
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json(produto);
    } catch {
      res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  },

  criar: async (req, res) => {
  try {
    const { nome, descricao, preco, estoque, imagemURL } = req.body;

    if (!nome || !preco) {
      return res.status(400).json({ error: 'Nome e preço obrigatórios' });
    }

    const novo = await ProdutoModel.criar({
      nome,
      descricao,
      preco,
      estoque,
      imagemURL 
    });

    res.status(201).json(novo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
},

  atualizar: async (req, res) => {
    try {
      const atualizado = await ProdutoModel.atualizar(req.params.id, req.body);

      if (!atualizado) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      res.json({ message: 'Produto atualizado' });
    } catch {
      res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  },

  deletar: async (req, res) => {
    try {
      const deletado = await ProdutoModel.deletar(req.params.id);

      if (!deletado) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      res.json({ message: 'Produto deletado' });
    } catch {
      res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  }

  
};


export default ProdutoController;