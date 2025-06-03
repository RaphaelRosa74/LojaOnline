import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListaProdutos from './pages/ListaProdutos';
import DetalhesProduto from './pages/DetalhesProduto';
import Carrinho from './pages/Carrinho';
import { CarrinhoProvider } from './context/CarrinhoContext';

import './styles/main.css';

function App() {
  return (
    <CarrinhoProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<ListaProdutos />} />
              <Route path="/produto/:id" element={<DetalhesProduto />} />
              <Route path="/carrinho" element={<Carrinho />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CarrinhoProvider>
  );
}

export default App;