import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/carrinhoContext';
import { useAuth } from '../auth/authContext';
import styles from './cards.module.css';

function CartaoProduto({ product, favoritadoInicial = false, onToggleFavorite }) {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const [isFavorited, setIsFavorited] = useState(favoritadoInicial);

    useEffect(() => {
        setIsFavorited(favoritadoInicial);
    }, [favoritadoInicial]);

    const handleAddToCart = (event) => {
        event.preventDefault();
        addToCart({
            id: product.id,
            name: product.nome,
            price: product.preco,
            imageUrl: product.imagemURL,
        });
    };

    const handleToggleFavorite = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) { 
            alert("Sessão expirada."); 
            return; 
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            if (isFavorited) {
                await axios.delete(`http://localhost:3000/favoritos/${product.id}`, config);
                setIsFavorited(false);

                if (onToggleFavorite) {
                    onToggleFavorite();
                }
            } else {
                await axios.post('http://localhost:3000/favoritos', { id_produto: product.id }, config);
                setIsFavorited(true);
            }
        } catch (err) {
            console.error("Erro na API:", err.response?.data);
        }
    };

    const precoNumerico = parseFloat(product.preco) || 0;

    return (
        <Link to={`/produto/${product.id}`} className={styles.cartaoProdutoLink}>
            <div className={styles.cartaoProduto}>
                <img src={product.imagemURL || ''} alt={product.nome} className={styles.cartaoProdutoImagem} />
                <h3 className={styles.cartaoProdutoNome}>{product.nome}</h3>
                <p className={styles.cartaoProdutoPreco}>R$ {precoNumerico.toFixed(2)}</p>

                <div className={styles.containerAcoes}>
                    <button
                        onClick={handleToggleFavorite}
                        className={`${styles.botaoFavorito} ${isFavorited ? styles.favoritado : ''}`}
                        title={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-40 -40 592 592" fill={isFavorited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" className={styles.iconeFavoritos}>
                            <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144 34.1-6.5 69 3.9 94.8 28.3L256 113.1l42-39.3c25.8-24.4 60.7-34.8 94.8-28.3 69.2 13.2 119.2 73.6 119.2 144v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-16.5 15.5-44 15.5-60.4 0z" />
                        </svg>
                    </button>

                    <button onClick={handleAddToCart} className={styles.botaoAdicionar}>
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default CartaoProduto;