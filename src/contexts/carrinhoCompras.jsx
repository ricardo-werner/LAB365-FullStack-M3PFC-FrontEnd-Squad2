import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [itensCarrinho, setItensCarrinho] = useState(
    localStorage.getItem("itensCarrinho")
      ? JSON.parse(localStorage.getItem("itensCarrinho"))
      : []
  );

  const adicionarAoCarrinho = (item) => {
    const isItemInCart = itensCarrinho.find((itemCarrinho) => itemCarrinho.id === item.id);

    if (isItemInCart) {
      setItensCarrinho(
        itensCarrinho.map((itemCarrinho) =>
          itemCarrinho.id === item.id
            ? { ...itemCarrinho, qtde: itemCarrinho.qtde + 1 }
            : itemCarrinho
        )
      );
    } else {
      setItensCarrinho([...itensCarrinho, { ...item, qtde: 1 }]);
    }
  };

  const removerDoCarrinho = (item) => {
    const isItemInCart = itensCarrinho.find((itemCarrinho) => itemCarrinho.id === item.id);

    if (isItemInCart.qtde === 1) {
      setItensCarrinho(itensCarrinho.filter((itemCarrinho) => itemCarrinho.id !== item.id));
    } else {
      setItensCarrinho(
        itensCarrinho.map((itemCarrinho) =>
          itemCarrinho.id === item.id
            ? { ...itemCarrinho, qtde: itemCarrinho.qtde - 1 }
            : itemCarrinho
        )
      );
    }
  };

  const limparCarrinho = () => {
    setItensCarrinho([]);
  };

  const valorTotalCarrinho = () => {
    return itensCarrinho.reduce(
      (total, item) => total + item.precoUnitario * item.qtde,
      0
    );
  };

  useEffect(() => {
    const data = localStorage.getItem("itensCarrinho");
    if (data) {
      setItensCarrinho(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("itensCarrinho", JSON.stringify(itensCarrinho));
  }, [itensCarrinho]);

  return (
    <CartContext.Provider
      value={{
        itensCarrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        valorTotalCarrinho,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
