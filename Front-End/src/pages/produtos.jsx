import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarraNavegacao from '../componentes/barraNavegacao.jsx';
import Rodape from '../componentes/rodape.jsx';
import CartaoProduto from '../componentes/cards.jsx';
import styles from './produtos.module.css';

function Produtos() {
  const [listaDeProdutos, setListaDeProdutos] = useState([]);
  const [termoDeBusca, setTermoDeBusca] = useState('');
  const [favoritosIds, setFavoritosIds] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        // Busca produtos
        const resProdutos = await axios.get('http://localhost:3000/produtos');
        setListaDeProdutos(resProdutos.data);

        // Busca favorito
        const token = localStorage.getItem('token');
        if (token) {
          const resFavoritos = await axios.get('http://localhost:3000/favoritos', {
            headers: { Authorization: `Bearer ${token}` }
          });

          setFavoritosIds(resFavoritos.data.map(fav => fav.id));
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
    carregarDados();
  }, []);

  const produtosFiltrados = listaDeProdutos.filter(produto => 
    produto.nome.toLowerCase().includes(termoDeBusca.toLowerCase())
  );

  return (
  <div className={styles.paginaProdutos}>
    <BarraNavegacao />
    <main className={styles.conteudoGeral}>

      <div className={styles.titulos}>
        <h2>Nosso Catálogo</h2>
        <p>Explore todos os nossos produtos feitos à mão com carinho.</p>
      </div>
      
      <input 
        type="text"
        className={styles.campoBusca}
        placeholder="Buscar por nome..."
        value={termoDeBusca}
        onChange={e => setTermoDeBusca(e.target.value)}
      />
      
      <div className={styles.gradeProdutosDestaque}>
        {produtosFiltrados.map(produto => (
          <CartaoProduto 
            key={produto.id} 
            product={produto} 
            favoritadoInicial={favoritosIds.includes(produto.id)} 
          />
        ))}
      </div>
    </main>
    <Rodape />
  </div>
  );
}

export default Produtos;