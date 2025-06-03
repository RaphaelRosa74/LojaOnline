import React, { createContext, useState, useContext } from 'react';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setItens((prevItens) => {
      const itemExistente = prevItens.find(item => item.id === produto.id);
      
      if (itemExistente) {
        return prevItens.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      
      return [...prevItens, { ...produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id) => {
    setItens((prevItens) => {
      const itemExistente = prevItens.find(item => item.id === id);
      
      if (itemExistente && itemExistente.quantidade > 1) {
        return prevItens.map(item =>
          item.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        );
      }
      
      return prevItens.filter(item => item.id !== id);
    });
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0);
  const valorTotal = itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        totalItens,
        valorTotal,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}