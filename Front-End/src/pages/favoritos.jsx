import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardProduto from '../componentes/cards';
import BarraNavegacao from '../componentes/barraNavegacao';
import Rodape from '../componentes/rodape'; 
import styles from './favoritos.module.css';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const buscarFavoritos = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:3000/favoritos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavoritos(res.data);
      } catch (err) {
        console.error("Erro ao buscar favoritos", err);
      }
    };
    buscarFavoritos();
  }, []);

  const removerDaListaLocal = (idProduto) => {
    setFavoritos(prev => prev.filter(item => item.id !== idProduto));
  };

  return (
    <div className={styles.containerFavoritos}>
      <BarraNavegacao />
      <main className={styles.conteudoGeral}>
        <section className={styles.secaoFavoritos}>
          
          <div className={styles.titulos}>
            <h2>Meus Favoritos</h2>
            <p>Explore os produtos salvos por você!</p>
          </div>

          <div className={styles.gradeProdutos}>
            {favoritos.length > 0 ? (
              favoritos.map(produto => (
                <CardProduto 
                  key={produto.id} 
                  product={produto} 
                  favoritadoInicial={true} 
                  onToggleFavorite={() => removerDaListaLocal(produto.id)}
                />
              ))
            ) : (
              <p className={styles.mensagemVazia}>
                Você ainda não adicionou produtos aos seus favoritos.
              </p>
            )}
          </div>
        </section>
      </main>
      <Rodape />
    </div>
  );
}

export default Favoritos;