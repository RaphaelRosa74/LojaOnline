import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import '../styles/components/Navbar.css';

function Navbar() {
  const { totalItens } = useCarrinho();

  return (
    <nav className="navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Loja Online
        </Link>
        
        <div className="navbar-items">
          <Link className="nav-link" to="/">
            Produtos
          </Link>
          <Link className="cart-btn" to="/carrinho">
            <span className="hover:animate-bounce">🛒</span>
            <span>Carrinho</span>
            {totalItens > 0 && (
              <span className="cart-count animate-pulse">
                {totalItens}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;