import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { imagens } from '../imagens';
import { useAuth } from '../auth/authContext';
import { useCart } from '../context/carrinhoContext.jsx';
import styles from './barraNavegacao.module.css';

function BarraNavegacao() { 
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { cartItems } = useCart(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const totalItemsNoCarrinho = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={styles.barraNavegacao}> 
      <Link to="/" className={styles.logoNavegacao}>
        <img src={imagens.logo} alt="Logo Sorriso do Cerrado" className={styles.logoImagem} />
        <span>Sorriso do Cerrado</span>
      </Link>
      <ul className={styles.linksNavegacao}>
        <li><Link to="/">Início</Link></li>
        <li><Link to="/produtos">Produtos</Link></li>

        {isAuthenticated ? (
          <>
            {isAdmin && (
              <li><Link to="/admin">Painel Admin</Link></li>
            )}
            <li>
              <button onClick={handleLogout} className={styles.botaoLogout}>Sair</button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}

        <li>
          <Link to="/favoritos" className={styles.linkFavoritos}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-40 -40 592 592" fill="none" stroke="currentColor" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" className={styles.iconeFavoritos} style={{ aspectRatio: '1 / 1', flexShrink: 0 }} >
              <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144 34.1-6.5 69 3.9 94.8 28.3L256 113.1l42-39.3c25.8-24.4 60.7-34.8 94.8-28.3 69.2 13.2 119.2 73.6 119.2 144v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-16.5 15.5-44 15.5-60.4 0z"/>
            </svg>
          </Link>
        </li>

        <li>
          <Link to="/carrinho" className={styles.linkCarrinho}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.iconeCarrinho}>
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {totalItemsNoCarrinho > 0 && (
              <span className={styles.badgeCarrinho}>{totalItemsNoCarrinho}</span>
            )}
          </Link>
        </li>

      </ul>
    </nav>
  );
}

export default BarraNavegacao;