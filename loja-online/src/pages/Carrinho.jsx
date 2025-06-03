import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import '../styles/pages/Carrinho.css';
import '../styles/utils/_animations.css';
import '../styles/utils/_utilities.css';

function Carrinho() {
  const { 
    itens, 
    totalItens, 
    valorTotal, 
    adicionarAoCarrinho, 
    removerDoCarrinho, 
    limparCarrinho 
  } = useCarrinho();

  if (totalItens === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon pulse">🛒</div>
        <h3>Seu carrinho está vazio</h3>
        <Link to="/" className="product-btn-add">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container fade-in">
      <div className="cart-content">
        <div className="cart-items">
          <h2>Seu Carrinho</h2>
          {itens.map(item => (
            <div key={item.id} className="cart-item hover-scale">
              <img 
                src={item.imagem} 
                className="cart-item-image" 
                alt={item.nome}
              />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.nome}</h3>
                <p className="cart-item-price">R$ {item.preco.toFixed(2)}</p>
                <div className="cart-item-actions">
                  <button 
                    onClick={() => removerDoCarrinho(item.id)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="cart-item-quantity">{item.quantidade}</span>
                  <button 
                    onClick={() => adicionarAoCarrinho(item)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                  <span className="cart-item-total">
                    R$ {(item.quantidade * item.preco).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="summary-card">
            <h3 className="summary-title">Resumo do Pedido</h3>
            <div className="summary-row">
              <span>Total de itens:</span>
              <span>{totalItens}</span>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>R$ {valorTotal.toFixed(2)}</span>
            </div>
            <div className="summary-buttons">
              <button 
                className="product-btn-details"
                onClick={limparCarrinho}
              >
                Limpar Carrinho
              </button>
              <button className="product-btn-add">
                Finalizar Compra
              </button>
              <Link to="/" className="product-btn-details">
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrinho;