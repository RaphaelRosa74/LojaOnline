import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCarrinho } from "../context/CarrinhoContext";
import "../styles/pages/DetalhesProduto.css";
import "../styles/utils/_animations.css";
import "../styles/utils/_utilities.css";

function DetalhesProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const { adicionarAoCarrinho } = useCarrinho();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/produtos/${id}`)
      .then((response) => {
        setProduto(response.data);
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar produto:", error);
        setCarregando(false);
      });
  }, [id]);

  if (carregando) {
    return (
      <div className="flex-center min-h-screen">
        <div className="spin text-primary" style={{ fontSize: "3rem" }}>
          ⏳
        </div>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="flex-center min-h-screen">
        <div className="bg-danger text-white p-4 rounded shadow-md">
          Produto não encontrado!
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container fade-in">
      <div className="grid-2-col">
        <div>
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="product-detail-image"
          />
        </div>
        <div className="product-detail-info">
          <h1 className="product-detail-title">
            {produto.nome}
          </h1>
          <p className="product-detail-price">
            R$ {produto.preco.toFixed(2)}
          </p>
          <p className="product-detail-description">
            {produto.descricao}
          </p>
          <div className="action-buttons">
            <button
              onClick={() => adicionarAoCarrinho(produto)}
              className="product-btn-add"
            >
              Adicionar ao Carrinho
            </button>
            <Link
              to="/"
              className="product-btn-details"
            >
              Voltar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesProduto;