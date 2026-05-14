import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BarraNavegacao from '../componentes/barraNavegacao.jsx';
import Rodape from '../componentes/rodape.jsx';
import styles from './adicionarProduto.module.css';

function AdicionarProduto() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [imagemURL, setImagemURL] = useState('');
  const [arquivoImagem, setArquivoImagem] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUploadImagem = async () => {
    try {
      if (!arquivoImagem) return imagemURL;

      const formData = new FormData();
      formData.append('imagem', arquivoImagem);

      const res = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("UPLOAD OK:", res.data.url);

      return res.data.url;
    } catch (err) {
      console.error("Erro no upload:", err.response?.data || err.message);
      throw new Error('Falha no upload da imagem');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Usuário não autenticado');
        return;
      }

      const urlFinal = await handleUploadImagem();

      const novoProduto = {
        nome,
        descricao,
        preco: parseFloat(preco),
        estoque: parseInt(estoque, 10),
        imagemURL: urlFinal
      };

      console.log("ENVIANDO PRODUTO:", novoProduto);

      await axios.post('http://localhost:3000/produtos', novoProduto, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert('Produto adicionado com sucesso!');
      navigate('/admin');

    } catch (err) {
      console.error("ERRO COMPLETO:", err.response?.data || err.message);
      setError('Erro ao adicionar produto');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BarraNavegacao />

      <main className="conteudo-geral" style={{ padding: '2rem', flex: 1 }}>
        <div className={styles.formularioContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Adicionar Novo Produto</h2>

            <div className={styles.campoFormulario}>
              <label>Nome do Produto</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className={styles.campoFormulario}>
              <label>Descrição</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows="4"
              />
            </div>

            <div className={styles.campoFormulario}>
              <label>Preço</label>
              <input
                type="number"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
                step="0.01"
              />
            </div>

            <div className={styles.campoFormulario}>
              <label>Estoque</label>
              <input
                type="number"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                required
              />
            </div>

            <div className={styles.campoFormulario}>
              <label>Upload de imagem</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setArquivoImagem(e.target.files[0])}
              />
            </div>

            <p style={{ textAlign: 'center' }}>ou</p>

            <div className={styles.campoFormulario}>
              <label>URL da imagem</label>
              <input
                type="text"
                value={imagemURL}
                onChange={(e) => setImagemURL(e.target.value)}
              />
            </div>

            {error && <p className={styles.mensagemErro}>{error}</p>}

            <button type="submit" className={styles.botaoSubmit}>
              Salvar Produto
            </button>
          </form>
        </div>
      </main>

      <Rodape />
    </div>
  );
}

export default AdicionarProduto;