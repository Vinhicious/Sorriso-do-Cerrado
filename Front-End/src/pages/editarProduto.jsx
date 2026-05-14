import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BarraNavegacao from '../componentes/barraNavegacao.jsx';
import Rodape from '../componentes/rodape.jsx';
import styles from './editarProduto.module.css';

function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [imagemURL, setImagemURL] = useState('');
  const [arquivoImagem, setArquivoImagem] = useState(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/produtos/${id}`);
        const produto = response.data;

        if (produto) {
          setNome(produto.nome);
          setDescricao(produto.descricao);
          setPreco(produto.preco);
          setEstoque(produto.estoque);
          setImagemURL(produto.imagemURL || '');
        } else {
          setError("Produto não encontrado.");
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os dados do produto.");
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id]);

  const handleUploadImagem = async () => {
    if (!arquivoImagem) return imagemURL;

    const formData = new FormData();
    formData.append('imagem', arquivoImagem);

    const res = await axios.post('http://localhost:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return res.data.url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');

      const urlFinal = await handleUploadImagem();

      const produtoAtualizado = {
        nome,
        descricao,
        preco: parseFloat(preco),
        estoque: parseInt(estoque, 10),
        imagemURL: urlFinal
      };

      await axios.put(`http://localhost:3000/produtos/${id}`, produtoAtualizado, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Produto atualizado com sucesso!');
      navigate('/admin');

    } catch (err) {
      console.error(err);
      setError('Falha ao atualizar o produto.');
    }
  };

  if (loading) return <div>A carregar...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <BarraNavegacao />

      <main className="conteudo-geral" style={{ padding: '2rem' }}>
        <div className={styles.formularioContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Editar Produto</h2>

            <div className={styles.campoFormulario}>
              <label>Nome do Produto</label>
              <input value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>

            <div className={styles.campoFormulario}>
              <label>Descrição</label>
              <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </div>

            <div className={styles.campoFormulario}>
              <label>Preço</label>
              <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} required step="0.01" />
            </div>

            <div className={styles.campoFormulario}>
              <label>Estoque</label>
              <input type="number" value={estoque} onChange={(e) => setEstoque(e.target.value)} required />
            </div>

            {/* UPLOAD NOVO */}
            <div className={styles.campoFormulario}>
              <label>Alterar imagem</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setArquivoImagem(e.target.files[0])}
              />
            </div>

            {/* fallback opcional */}
            <div className={styles.campoFormulario}>
              <label>URL atual (opcional)</label>
              <input
                type="text"
                value={imagemURL}
                onChange={(e) => setImagemURL(e.target.value)}
              />
            </div>

            {error && <p className={styles.mensagemErro}>{error}</p>}

            <button type="submit" className={styles.botaoSubmit}>
              Salvar Alterações
            </button>
          </form>
        </div>
      </main>

      <Rodape />
    </div>
  );
}

export default EditarProduto;