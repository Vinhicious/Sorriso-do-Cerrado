import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Produtos from './pages/produtos';
import DetalheProduto from './pages/detalhesProduto';
import Login from './pages/login';
import AdminPainel from './pages/adminPainel';
import AdicionarProduto from './pages/adicionarProduto';
import EditarProduto from './pages/editarProduto';
import RotaProtegida from './auth/rotaProtegida';
import Favoritos from './pages/favoritos';
import Carrinho from './pages/carrinho';
import Cadastro from './pages/cadastro';
import './global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produto/:id" element={<DetalheProduto />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route
          path="/admin"
          element={<RotaProtegida><AdminPainel /></RotaProtegida>}
        />
        <Route
          path="/admin/adicionar-produto"
          element={<RotaProtegida><AdicionarProduto /></RotaProtegida>}
        />
        <Route
          path="/admin/editar-produto/:id"
          element={<RotaProtegida><EditarProduto /></RotaProtegida>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;