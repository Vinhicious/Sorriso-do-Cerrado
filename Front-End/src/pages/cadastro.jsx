import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/authContext';
import BarraNavegacao from '../componentes/barraNavegacao.jsx';
import Rodape from '../componentes/rodape.jsx';
import { Link } from 'react-router-dom';
import styles from './cadastro.module.css';

function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [papel, setPapel] = useState('cliente');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/usuarios/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email, senha, papel })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Usuário cadastrado com sucesso!');
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                alert(data.message || 'Erro ao cadastrar');
            }
        } catch (error) {
            console.error(error);
            alert('Erro na requisição');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <BarraNavegacao />
            <main className="conteudo-geral" style={{ padding: '2rem' }}>
                <div className={styles.formularioContainer}>
                    <form onSubmit={handleSubmit}>
                        <h2>Registrar-se</h2>
                        <div className={styles.campoFormulario}>
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>
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
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                        <button type="submit" className={styles.botaoSubmit}>Registrar</button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Cadastro;