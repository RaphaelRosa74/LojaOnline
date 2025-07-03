import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const navigate = useNavigate();

  // Função para simular finalização da compra
  const finalizarCompra = () => {
    setCompraFinalizada(true);
    limparCarrinho();

    // Redireciona após 3 segundos
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (totalItens === 0 && !compraFinalizada) {
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
      {compraFinalizada && (
        <div className="modal">
          <div className="modal-content scale-in">
            <h2>✅ Compra Finalizada!</h2>
            <p>Obrigado pela sua compra.</p>
            <p>Você será redirecionado para a loja em instantes...</p>
          </div>
        </div>
      )}

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
                <p className="cart-item-price">{item.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
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
                    {(item.quantidade * item.preco).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
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
              <span>{valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
            </div>
            <div className="summary-buttons">
              <button 
                className="product-btn-details"
                onClick={limparCarrinho}
              >
                Limpar Carrinho
              </button>
              <button 
                className="product-btn-add"
                onClick={finalizarCompra}
              >
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
