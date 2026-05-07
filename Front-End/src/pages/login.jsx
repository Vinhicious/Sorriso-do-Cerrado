import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/authContext'; 
import BarraNavegacao from '../componentes/barraNavegacao.jsx';
import Rodape from '../componentes/rodape.jsx';
import styles from './login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/usuarios/login', {
        email,
        senha: password
      });

      login(response.data.token);

      alert('Login realizado com sucesso!');
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao tentar fazer login.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BarraNavegacao />
      <main className="conteudo-geral" style={{ padding: '2rem' }}>
        <div className={styles.formularioContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Acesso Administrativo</h2>
            <div className={styles.campoFormulario}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className={styles.campoFormulario}>
              <label htmlFor="password">Senha</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            {error && <p className={styles.mensagemErro}>{error}</p>}
            <button type="submit" className={styles.botaoSubmit}>Entrar</button>
          </form>
        </div>
      </main>
      <Rodape />
    </div>
  );
}

export default Login;
