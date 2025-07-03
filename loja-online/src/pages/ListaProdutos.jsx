import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCarrinho } from '../context/CarrinhoContext';
import '../styles/pages/ListaProdutos.css';
import '../styles/utils/_animations.css';
import '../styles/utils/_utilities.css';


function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const { adicionarAoCarrinho } = useCarrinho();

  useEffect(() => {
    axios.get('http://localhost:3001/produtos')
      .then(response => {
        setProdutos(response.data);
        setCarregando(false);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        setCarregando(false);
      });
  }, []);


  if (carregando) {
    return (
      <div className="flex-center min-h-screen">
        <div className="spin text-primary" style={{ fontSize: '2rem' }}>
          ⏳
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="product-grid">
        {produtos.map(produto => (
          <div 
            key={produto.id} 
            className="product-card"
          >
            <img 
              src={produto.imagem}
              className="product-image" 
              alt={produto.nome}
            />
            <div className="product-body">
              <h3 className="product-title">{produto.nome}</h3>
              <p className="product-description">{produto.descricao}</p>
              <p className="product-price">
                {produto.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
              </p>
            </div>
              <div className="product-footer">
                <Link 
                  to={`/produto/${produto.id}`} 
                  className="product-btn-details"
                >
                  Detalhes
                </Link>
                <button 
                  onClick={() => adicionarAoCarrinho(produto)}
                  className="product-btn-add"
                >
                  Adicionar
                </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaProdutos;
